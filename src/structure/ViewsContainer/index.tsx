import React from 'react';
import styles from './index.module.css';

import ToolbarView from '../ToolbarView';
import SidebarView from '../SidebarView';
import SidebarChildView from '../SidebarChildView';
import DisplayView from '../DisplayView';
import EditPanelView from '../EditPanelView';

import root from '../../libs/base/root';

class ViewsContainer extends React.Component {
  componentDidMount () {
    root.init();
  }
  render () {
    return <div className={styles['bb-view-container']}>
      <ToolbarView />
      <SidebarView />
      <SidebarChildView />
      <DisplayView />
      <EditPanelView />
    </div>
  }
}

export default ViewsContainer;
