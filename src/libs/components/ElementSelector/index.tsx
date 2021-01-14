import React, { useState, useEffect } from 'react';
import { withSelectedIds } from '../../../controller/wrapper';
import { setSelected } from '../../../controller/store/state';

import './index.less';

class SelectorBox extends React.Component<any> {
  setSelected = () => {
    setSelected([this.props.id]);
  }
  render () {
    const { id, selectedIds } = this.props;

    return ~selectedIds.indexOf(id) ? (<>
      <span className="bb-selector-box-border j-top"></span>
      <span className="bb-selector-box-border j-right"></span>
      <span className="bb-selector-box-border j-bottom"></span>
      <span className="bb-selector-box-border j-left"></span>
    </>) : <div className="bb-selector-box-normal" onClick={this.setSelected}></div>;
  }
}

export default withSelectedIds(SelectorBox);
