import { EditPanel } from '../edit-panel';
import { ElementEventBus } from '../../../controller';

interface Props {
  el: HTMLElement
}
export class ExtensionWrite {
  protected $bus = ElementEventBus
  protected $options:any = null

  constructor (props: Props) {
    this.$options = props;
  }

  mounted = () => {}
  update = (options: any) => {}
  beforeDestroy = () => {}
}

export interface IfExtension {
  id: string;
  version: string;
  icon: string;
  name: string;
  template: any;
  write: any;
  editPanel: any;
}

// export class Extension implements IfExtension {
//   id: string;
//   version: string;
//   icon: string;
//   title: string;
//   template: any;
//   write: any;
//   editPanel: any;

//   constructor (options: IfExtension) {
//     this.id = options.id;
//     this.version = options.version;
//     this.icon = options.icon;
//     this.title = options.title;
//     this.template = options.template;
//     this.write = options.write;
//     this.editPanel = options.editPanel;
//   }
// }
