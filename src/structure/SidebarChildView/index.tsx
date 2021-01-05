import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css';

class SidebarChild extends React.Component {
  render () {
    return ReactDOM.createPortal(
      <div className={styles['bb-sidebar-child']}></div>,
      document.body
    );
  }
}

export default SidebarChild;
