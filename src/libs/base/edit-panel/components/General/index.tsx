import { EditPanel, EditPanelNode, NodeProps } from '../../index';

const children: any[] = [
  {
    name: '纵向',
    type: 'radio',
    dataIndex: '0',
    pos: 'layout.reference',
    transvalue: (value: any) => value.split('|')[0],
    beforesave: (value: any, options: any) => {
      let res = options.layout.reference.split('|');
      res[0] = value;
      return { 'layout.reference': res.join('|') };
    },
    options: [
      {
        value: 'top',
        label: '顶部'
      },
      {
        value: 'bottom',
        label: '底部'
      }
    ]
  },
  {
    name: '横向',
    type: 'radio',
    dataIndex: '2',
    pos: 'layout.reference',
    transvalue: (value: any) => value.split('|')[1],
    beforesave: (value: any, options: any) => {
      let res = options.layout.reference.split('|');
      res[1] = value;
      return { 'layout.reference': res.join('|') };
    },
    options: [
      {
        value: 'left',
        label: '左边'
      },
      {
        value: 'right',
        label: '右边'
      }
    ]
  },
  {
    name: '上',
    type: 'inputNumber',
    pos: 'layout.top',
    span: 12,
    options: {
      min: 0,
      max: Infinity
    }
  },
  {
    name: '左',
    type: 'inputNumber',
    pos: 'layout.left',
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
