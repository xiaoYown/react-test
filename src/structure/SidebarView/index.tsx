import React from 'react';
import styles from './index.module.css';

import sidebar, { AnyComponent } from '../../libs/components/Sidebar';


interface Props {
  render: () => AnyComponent;
}

function SidebarView(props: Props) {
  return (
    <div className={styles['bb-sidebar-view']}>
      { props.render() }
    </div>
  );
}

export default sidebar.init(SidebarView);
