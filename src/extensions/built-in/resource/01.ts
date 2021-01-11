import * as G2Plot from '@antv/g2plot';
import { IfExtension, ExtensionWrite } from '../../../libs/base/extension';
import { EditPanel, EditPanelNode, NodeProps } from '../../../libs/base/edit-panel';
import template from './01.template.json';

import icon from './01.svg';
class ExtensionWrite01 extends ExtensionWrite {
  mounted = () => {
    const { id, config, data } = this.$options;
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

export const Extension01: IfExtension = {
  id: '01',
  version: '0.0.0',
  icon,
  name: '柱形图',
  template: () => template,
  write: ExtensionWrite01,
  editPanel: EditPanel01
}
