import { EditPanel, EditPanelNode, NodeProps } from '../../index';

const children: any[] = [
  {
    name: 'x',
    type: 'inputNumber',
    pos: 'layout.left',
    span: 12,
    options: {
      min: 0,
      max: Infinity
    }
  },
  {
    name: 'y',
    type: 'inputNumber',
    pos: 'layout.top',
    span: 12,
    options: {
      min: 0,
      max: Infinity
    }
  },
  {
    name: 'width',
    type: 'inputNumber',
    pos: 'layout.width',
    span: 12,
    options: {
      min: 0,
      max: Infinity
    }
  },
  {
    name: 'height',
    type: 'inputNumber',
    pos: 'layout.height',
    span: 12,
    options: {
      min: 0,
      max: Infinity
    }
  }
]

export class GeneralPanel extends EditPanel {
  getChildren = () => {
    return children.map((item: NodeProps) => new EditPanelNode(item, ''));
  }
}
