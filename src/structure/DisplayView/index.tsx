import React from 'react';
import styles from './index.module.css';
import { withElementList, withElement } from '../../controller/wrapper';

import { ElementExtension } from '../../libs/base/extension/components/Element'

const ElementDefault = withElement((props: any) => {
  return <pre style={{ backgroundColor: '#FFFFFF' }}>{JSON.stringify(props.options.resource, null, 2)}</pre>
})

function DisplayView(props: any) {
  return (
    <div className={styles['bb-display-view']}>
      {
        props.elementList.map((id: any) => {
          return <ElementExtension key={id} id={id} />
        })
      }
      {/* <div>
        {
          props.elementList.map((id: any) => {
            return <ElementDefault key={id} id={id} />
          })
        }
      </div> */}
    </div>
  );
}

export default withElementList(DisplayView);
