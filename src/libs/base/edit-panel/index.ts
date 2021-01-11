import { updateElement } from '../../../controller/store/state';

type nodeType = 'switch';

export interface NodeProps {
  id: string
  name: string
  type: nodeType
  pos: string
  resource: any
  beforesave: () => {}
  onSave?: (id: string, key: string, value: any) => {}
}

export class EditPanelNode {
  id: string
  name: string
  type: nodeType
  pos: string
  resource: any
  beforesave: (res: any) => {}
 
  constructor (props: NodeProps) {
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.pos = props.pos;
    this.resource = props.resource;
    this.beforesave = props.beforesave || ((res: any) => res);
  }

  setPre = (data: any) => {
    const res: any = {};
    for (let key in data) {
      res[`resource.${key}`] = data[key];
    }
    return res;
  }

  onSave = (id: string, key: string, value: any) => {
    updateElement({
      id,
      data: this.setPre(this.beforesave({ [key]: value }))
    });
  }
}

export class EditPanel {
  update () {}
  // getChildren = () => {
  //   return [];
  // }
}
