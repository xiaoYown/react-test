import React from 'react';
import styles from './index.module.css';

import { withSelectedIds } from '../../controller/wrapper';
import { EditPanelTree } from '../../libs/components/EditPanel';

function EditPanelView(props: any) {
  return (
    <div className={styles['bb-editpanel-view']}>
      {
        props.selectedIds.length === 1 ? <EditPanelTree id={props.selectedIds[0]} /> : null
      }
    </div>
  );
}

export default withSelectedIds(EditPanelView);
