import React from 'react';
import styles from './index.module.css';
import Provider from '../../libs/components/Provider'

function ToolbarView() {
  return (
    <div className={styles['bb-toolbar-view']}>
      <Provider />
    </div>
  );
}

export default ToolbarView;
