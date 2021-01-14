import * as G2Plot from '@antv/g2plot';
import { IfExtension, ExtensionWrite } from '../../../../libs/base/extension';
import { EditPanel, EditPanelNode, NodeProps } from '../../../../libs/base/edit-panel';

import template from './template.json';
import icon from './icon.svg';

class ExtensionWrite01 extends ExtensionWrite {
  instance: any = null

  mounted = () => {
    this.paint(this.$options);
  }
  getOptions = (options: any) => {
    const { resource } = options;
    const { config, data } = resource;
    const _data = data.map((item: any) => ({...item}));
    
    const _config = Object.assign({}, config)
    if (!config.label.visible) {
      delete _config.label
    }
    return {
      data: _data,
      ..._config,
    };
  }
  update = (options: any) => {
    this.instance.destroy();
    this.paint(options);
  }
  paint = (options: any) => {
    const el: any = document.getElementById(options.id);
    this.instance = new G2Plot.Column(el, this.getOptions(options));
    this.instance.render();
  }
  beforeDestroy = () => {
    this.instance.destroy();
  }
}

const children: any[] = [
  {
    name: '显示标签',
    type: 'switch',
    pos: 'config.label.visible'
  }
]

class EditPanel01 extends EditPanel {
  
  update = () => {
    console.log('panel update');
  }
  getChildren = () => {
    return children.map((item: NodeProps) => new EditPanelNode(item));
  }
}

const Extension01: IfExtension = {
  id: '01',
  version: '0.0.0',
  icon,
  name: '柱形图',
  template: () => template,
  write: ExtensionWrite01,
  editPanel: EditPanel01
}

export default Extension01;