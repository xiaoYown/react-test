import React from 'react';
import styles from './index.module.css';
import { NodeProps } from '../index';
import { AnyComponent } from '../../../../@types';
import { withElementAndExtension } from '../../../../controller/wrapper';
import { extractPosValue } from '../../../../utils';
import { withElement } from '../../../../controller/wrapper';

import { Switch } from 'antd';

class PanelSwitch extends React.Component<NodeProps> {
  onSave = (value: any) => {
    const { pos } = this.props;
    const { onSave } = this.props
    onSave && onSave(this.props.id, pos, value);
  }
  render () {
    const { resource, pos, name } = this.props;
    const checked = extractPosValue(resource, pos);
    return <>
      <h5 className={styles['bb-edit-panel-item-title']}>{ name }</h5>
      <Switch size="small" checked={checked} onClick={this.onSave} />
    </>
  }
}

function EditPanelNode (props: NodeProps) {
  let Component: AnyComponent|null;

  switch (props.type) {
    case 'switch':
      Component = PanelSwitch;
      break
    default:
      Component = null;
  }
  return <div
    className={styles['bb-edit-panel-item']}
  >
    { Component ? <Component {...props} /> : null }
  </div>
}

interface EditPanelTreeProps {
  id: string
  options: any
  extensions: any
}

const ElementDefault = withElement((props: any) => {
  return <div>{JSON.stringify(props.options.resource, null, 2)}</div>
})

export class _EditPanelTree extends React.Component<EditPanelTreeProps> {
  state: any = {}

  static getDerivedStateFromProps (props: EditPanelTreeProps) {
    const { options, extensions } = props;
    const extension = extensions[options.extension];
    return {
      children: (new extension.editPanel()).getChildren()
    }
  }
  render () {
    const { children } = this.state;
    const { options, id } = this.props;
    return !options ? null : <>
      <h4>公共属性</h4>
      TODO:
      <h4>私有属性</h4>
      {
        children.map((item: NodeProps) => {
          return <EditPanelNode
            {...item}
            key={item.pos}
            id={id}
            resource={options.resource}
          />
        })
      }
      {/* <pre style={{ fontSize: '10px' }}>
        <ElementDefault id={id} />
      </pre> */}
    </>
  }
}

export const EditPanelTree = withElementAndExtension(_EditPanelTree);
