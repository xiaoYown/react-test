import React from 'react';
import { NodeProps } from '../index';
import { withElementAndExtension } from '../../../../controller/wrapper';
import { GeneralPanel } from './General';
import { Row } from 'antd';

import { EditPanelNode } from './PanelItem';

interface EditPanelTreeProps {
  id: string
  options: any
  extensions: any
}

export class _EditPanelTree extends React.Component<EditPanelTreeProps> {
  state: any = {}

  static getDerivedStateFromProps (props: EditPanelTreeProps) {
    const { options, extensions } = props;
    const extension = extensions[options.extension];
    return {
      generalChildren: (new GeneralPanel()).getChildren(),
      resourceChildren: (new extension.editPanel()).getChildren()
    }
  }
  render () {
    const { generalChildren, resourceChildren } = this.state;
    const { options, id } = this.props;
    return !options ? null : <>
      <h4>公共属性</h4>
      <Row>
        {
          generalChildren.map((item: NodeProps) => {
            return <EditPanelNode
              {...item}
              key={(item.dataIndex || '') + item.pos}
              id={id}
              options={item.options}
              data={options}
            />
          })
        }
      </Row>
      <h4>私有属性</h4>
      <Row>
        {
          resourceChildren.map((item: NodeProps) => {
            return <EditPanelNode
              {...item}
              key={(item.dataIndex || '') + item.pos}
              id={id}
              options={item.options}
              data={options}
            />
          })
        }
      </Row>
    </>
  }
}

export const EditPanelTree = withElementAndExtension(_EditPanelTree);
