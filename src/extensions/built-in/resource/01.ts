import * as G2Plot from '@antv/g2plot';
import { IfExtension, ExtensionWrite } from '../../../libs/base/extension';
import EditPanel from '../../../libs/base/edit-panel';
import template from './01.template.json';

import icon from './01.svg';
console.log(G2Plot)
class ExtensionWrite01 extends ExtensionWrite {
  mounted = () => {
    console.log(this)
    console.log('element mounted');
    const { id, config, data } = this.$options;
    // const el = document.getElementById(id);
    // console.log(el)
    const _data = data.map((item: any) => ({...item}));
    const plot = new G2Plot.Column(id, {
      data: _data,
      ...config,
    });
    plot.render();
  }
  updated = () => {
    console.log('element update');
  }
}

class EditPanel01 extends EditPanel {
  
  updated = () => {
    console.log('panel update');
  }
}

export const Extension01: IfExtension = {
  id: '01',
  version: '0.0.0',
  icon,
  name: '柱形图',
  template: () => template,
  write: ExtensionWrite01,
  editPanel: EditPanel01
}
