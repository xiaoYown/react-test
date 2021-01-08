import React from 'react';
import { insertElement } from '../../../../controller/store/state';
import { withElementExtensions } from '../../../../controller/wrapper';
import styles from './index.module.css';
// import { IfExtension } from '../../../libs/base/extension';

interface Props {
  elementExtensions: any[],
  root: any
}

class Insert extends React.Component<Props> {
  insertElement (etx: any) {
    insertElement(etx);
  }
  render () {
    const { elementExtensions } = this.props;
    return <ul>
      {
        elementExtensions.map(item => {
          return <li
            key={item.id}
            className={styles['bb-sidebar-insert-item']}
            title={item.name}
            onClick={() => this.insertElement(item)}
          >
            <div className={styles['bb-sidebar-insert-item-icon']}>
              <img
                src={item.icon}
                alt={item.name}
              />
            </div><div className={styles['bb-sidebar-insert-item-title']}>
              { item.name }
            </div>
          </li>
        })
      }
    </ul>
  }
}

export default withElementExtensions(Insert);
