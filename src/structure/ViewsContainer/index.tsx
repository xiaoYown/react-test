import React from 'react';
import styles from './index.module.css';

import ToolbarView from '../ToolbarView';
import SidebarView from '../SidebarView';
import SidebarChildView from '../SidebarChildView';
import DisplayView from '../DisplayView';
import EditPanelView from '../EditPanelView';

import ErrorBoundary from '../../libs/components/error/ErrorBoundary';

import root from '../../libs/base/root';

class ViewsContainer extends React.Component {
  componentDidMount () {
    root.init();
  }
  render () {
    return <div className={styles['bb-view-container']}>
      <ErrorBoundary>
        <ToolbarView />
      </ErrorBoundary>
      <ErrorBoundary>
        <SidebarView />
      </ErrorBoundary>
      <ErrorBoundary>
        <SidebarChildView />
      </ErrorBoundary>
      <ErrorBoundary>
        <DisplayView />
      </ErrorBoundary>
      <ErrorBoundary>
        <EditPanelView />
      </ErrorBoundary>
    </div>
  }
}

export default ViewsContainer;
