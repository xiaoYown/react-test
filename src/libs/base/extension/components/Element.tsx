import React, { createRef } from 'react';
import { withElement, withElementExtensionsNoObserver } from '../../../../controller/wrapper';

interface LayoutProps {
  id: string
  render: () => {}
  layout: {
    position: string
    reference: string
    top: number
    bottom: number
    right: number
    left: number
    width: number
    height: number
    rotation: number
  }
}
interface LayoutStyle {
  position: string
  width: string
  height: string
  top?: string
  right?: string
  bottom?: string
  left?: string
}
interface LayoutState {
  didMount: boolean
  derivedStyle: any
}

class ElementLayout extends React.Component<LayoutProps, LayoutState> {

  state = {
    didMount: false,
    derivedStyle: {}
  }
  static getDerivedStateFromProps (props: LayoutProps) {
    const { layout } = props;
    const derivedStyle:LayoutStyle = {
      position: layout.position,
      width: layout.width + 'px',
      height: layout.height + 'px'
    };
    if (/top/.test(layout.reference)) {
      derivedStyle.top = layout.top + 'px'
    } else {
      derivedStyle.bottom = layout.bottom + 'px'
    }
    if (/left/.test(layout.reference)) {
      derivedStyle.left = layout.left + 'px'
    } else {
      derivedStyle.right = layout.right + 'px'
    }
    return {
      derivedStyle
    };
  }
  componentDidMount () {
    this.setState({ didMount: true });
  }

  render () {
    const { derivedStyle, didMount } = this.state;
    return <div
      id={this.props.id}
      style={derivedStyle}
    >{ didMount ? this.props.render() : null }</div>
  }
}

interface ElementRenderProps {
  id: string
  name: string
  layout: any
  extension: string
  extensions: any
  resource: any
}

class _ElementRender extends React.Component<ElementRenderProps> {
  elementInstance: any = null

  componentDidMount () {
    const { id, extension, extensions, resource } = this.props;
    const Write = extensions[extension].write;
    this.elementInstance = new Write({
      id,
      config: resource.config,
      data: resource.data
    });
    this.elementInstance.mounted();
  }
  shouldComponentUpdate () {
    return false
  }
  render () {
    return <div></div>
  }
}

const ElementRender = withElementExtensionsNoObserver(_ElementRender);

type Props = {
  options: ElementRenderProps
}

class _ElementExtension extends React.Component<Props> {
  render () {
    const { options } = this.props;
    const { id, layout } = options;
    return <ElementLayout
      id={id}
      layout={layout}
      render={() => <ElementRender {...options} />}
    />
  }
}

export const ElementExtension = withElement(_ElementExtension);
