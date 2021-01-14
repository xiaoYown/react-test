import { EditPanel, EditPanelNode, NodeProps } from '../../../base/edit-panel/index';
import { translator } from '../../../../i18n';

const children: any[] = [
  {
    name: translator('panel.vertical'),
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
        label: translator('panel.top')
      },
      {
        value: 'bottom',
        label: translator('panel.bottom')
      }
    ]
  },
  {
    name: translator('panel.horizontal'),
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
        label: translator('panel.left')
      },
      {
        value: 'right',
        label: translator('panel.right')
      }
    ]
  },
  {
    name: translator('panel.top'),
    type: 'inputNumber',
    pos: 'layout.top',
    span: 12,
    options: {
      min: 0,
      max: Infinity
    }
  },
  {
    name: translator('panel.left'),
    type: 'inputNumber',
    pos: 'layout.left',
    span: 12,
    options: {
      min: 0,
      max: Infinity
    }
  },
  {
    name: translator('panel.width'),
    type: 'inputNumber',
    pos: 'layout.width',
    span: 12,
    options: {
      min: 0,
      max: Infinity
    }
  },
  {
    name: translator('panel.height'),
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
