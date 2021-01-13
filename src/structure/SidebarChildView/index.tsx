import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css';

import { withSidebarChild } from '../../controller/wrapper';

// import { MouseBus, MouseEvents, ModalBus, ModalEvents } from '../../controller';

import { ChildViewComponent } from '../SidebarView/childView';

interface Props {
  view: string;
  options: any;
}

class SidebarChild extends React.Component<Props> {
  // hide = (event: any) => {
  //   const { view } = this.props;
  //   const el: any = document.getElementById('sidebar-child');
  //   if (view && !el.contains(event.target)) {
  //     ModalBus.emit(ModalEvents.CloseSideChild);
  //   }
  // }
  // componentDidMount () {
  //   MouseBus.on(MouseEvents.click, this.hide);
  // }
  // componentWillUnmount () {
  //   MouseBus.off(MouseEvents.click, this.hide);
  // }
  render () {
    const { view, options } = this.props;
    return ReactDOM.createPortal(
      <>
        {
          view ? <div id="sidebar-child" className={styles['bb-sidebar-child']}>
            <ChildViewComponent {...options} />
          </div> : null
        }
      </>,
      document.body
    );
  }
}

export default withSidebarChild(SidebarChild);
