import * as G2Plot from '@antv/g2plot';
import { IfExtension, ExtensionWrite } from '../../../../libs/base/extension';
import EditPanelText from './EditPanel';

import template from './template.json';
import icon from './icon.svg';

class ExtensionWriteText extends ExtensionWrite {
  instance: any = null

  mounted = () => {
    this.setContext(this.$options);
  }
  getElement = (options: any) => {
    const { resource } = options;
    const el = document.createElement('div');
    el.innerHTML = resource.data;
    el.style.fontSize = resource.style.fontSize + 'px';

    return el;
  }
  update = (options: any) => {
    this.setContext(options);
  }
  setContext = (options: any) => {
    const container = document.getElementById(options.id);

    if (!container) return;

    container.innerHTML = '';
    container.appendChild(this.getElement(options));
  }
}


const ExtensionText: IfExtension = {
  id: '02',
  version: '0.0.0',
  icon,
  name: '文本',
  template: () => template,
  write: ExtensionWriteText,
  editPanel: EditPanelText
}

export default ExtensionText;
