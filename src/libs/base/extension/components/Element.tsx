import React, { createRef } from 'react';
import { withElement, withElementAndExtension } from '../../../../controller/wrapper';
import ErrorBoundary from '../../error/ErrorBoundary';

function clone (data: any) {
  return JSON.parse(JSON.stringify(data));
}

interface LayoutProps {
  id: string
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
    >{ didMount ? this.props.children : null }</div>
  }
}

interface ElementRenderProps {
  id: string
  name: string
  layout: any
  extension: string
  resource: any
}
type Props = {
  extensions: any
  options: ElementRenderProps
}

class _ElementRender extends React.Component<Props> {
  elementInstance: any = null

  componentDidMount () {
    console.log(this.props)
    const { options, extensions } = this.props;
    const { extension } = options;
    const Write = extensions[extension].write;
    this.elementInstance = new Write(clone(options));
    this.elementInstance.mounted();
  }
  shouldComponentUpdate (nextProps: any) {
    this.elementInstance.update(nextProps.options);
    return false
  }
  render () {
    return null;
  }
}

const ElementRender = withElementAndExtension(_ElementRender);


function _ElementExtension (props: Props) {
  const { options } = props;
  const { id, layout } = options;

  return <ElementLayout
    id={id}
    layout={layout}
  >
    <ErrorBoundary>
      <ElementRender id={id} />
    </ErrorBoundary>
  </ElementLayout>
}

export const ElementExtension = withElement(_ElementExtension);
