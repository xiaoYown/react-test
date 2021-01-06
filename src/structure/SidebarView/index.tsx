import React from 'react';
import styles from './index.module.css';
import { ModalEvents } from '../../controller';

import sidebar, { SideNodeProps, AnyComponent } from './sidebar';

import { views } from './childView';

interface Props {
  render: () => AnyComponent;
}

const baseExtInsert: SideNodeProps = {
  key: views.insert,
  view: views.insert,
  icon: 'none',
  title: '插入',
  event: ModalEvents.OpenSideChild
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
