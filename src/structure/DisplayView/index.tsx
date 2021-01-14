import React from 'react';
import styles from './index.module.css';
import { withElementList } from '../../controller/wrapper';

import { ElementExtension } from '../../libs/components/ElementLayout/Element'

function DisplayView(props: any) {
  return (
    <div className={styles['bb-display-view']}>
      {
        props.elementList.map((id: any) => {
          return <ElementExtension key={id} id={id} />
        })
      }
    </div>
  );
}

export default withElementList(DisplayView);
