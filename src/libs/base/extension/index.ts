import EditPanel from '../edit-panel';
import { ElementEventBus } from '../../../controller';

export class ExtensionWrite {
  protected $bus = ElementEventBus
  mounted = () => {}
  updating = () => {}
  destroy = () => {}
}

interface IfExtension {
  id: string;
  version: string;
  icon: string;
  title: string;
  template: JSON;
  write: ExtensionWrite;
  editPanel: EditPanel;
}

export class Extension implements IfExtension {
  id: string;
  version: string;
  icon: string;
  title: string;
  template: JSON;
  write: ExtensionWrite;
  editPanel: EditPanel;

  constructor (options: IfExtension) {
    this.id = options.id;
    this.version = options.version;
    this.icon = options.icon;
    this.title = options.title;
    this.template = options.template;
    this.write = options.write;
    this.editPanel = options.editPanel;
  }
}
