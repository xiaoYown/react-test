import { EditPanel, EditPanelNode, NodeProps } from '../../../../libs/base/edit-panel';

const children: any[] = [
  {
    name: '内容',
    type: 'input',
    pos: 'data'
  },
  {
    name: '字号',
    type: 'inputNumber',
    pos: 'style.fontSize',
    options: {
      min: 8,
      max: 60
    }
  },
]

export default class EditPanelText extends EditPanel {
  
  update = () => {
    console.log('panel update');
  }
  getChildren = () => {
    return children.map((item: NodeProps) => new EditPanelNode(item));
  }
}
