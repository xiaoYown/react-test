import { updateElement } from '../../../controller/store/state';

type nodeType = 'switch'|'input'|'inputNumber'|'radio';

export interface NodeProps {
  id: string
  name: string
  type: nodeType
  dataIndex: any
  pos: string
  options: any
  data: any
  span: 12|24|undefined
  value?: any
  pre: string
  transvalue: (res: any) => any
  beforesave?: (res: any) => any
  onSave?: (id: string, value: any, data: any) => {}
}

export class EditPanelNode {
  id: string
  name: string
  type: nodeType
  dataIndex?: any
  pos: string
  options: any
  data: any
  span: 12|24|undefined
  pre: string
  transvalue: (res: any) => any
  beforesave: (res: any, options: any) => any
 
  constructor (props: NodeProps, pre?: string) {
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.dataIndex = props.dataIndex;
    this.pos = props.pos;
    this.options = props.options;
    this.data = props.data;
    this.span = props.span;
    this.pre = typeof pre === 'undefined' ? 'resource.' : pre;
    this.transvalue = props.transvalue || ((res: any) => res);
    this.beforesave = props.beforesave || ((value: any) => {
      return { [`${this.pre}${this.pos}`]: value }
    });
  }

  setPre = (data: any) => {
    const res: any = {};
    for (let key in data) {
      res[`${this.pre}${key}`] = data[key];
    }
    return res;
  }

  onSave = (id: string, value: any, data: any) => {
    updateElement({
      id,
      data: this.setPre(this.beforesave(value, data))
    });
  }
}

export class EditPanel {
  update () {}
  // getChildren = () => {
  //   return [];
  // }
}
