import React from 'react';
import styles from './index.module.css';

import sidebar, { SideNodeProps, AnyComponent } from './sidebar';

interface Props {
  render: () => AnyComponent;
}

const baseExtInsert: SideNodeProps = {
  key: 'insert',
  icon: 'none',
  title: '插入'
};

sidebar.register(baseExtInsert);

function SidebarView(props: Props) {
  return (
    <div className={styles['bb-sidebar-view']}>
      { props.render() }
    </div>
  );
}

export default sidebar.init(SidebarView);
