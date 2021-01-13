import React from 'react';
import Insert from './Insert';

export enum views {
  insert = 'insert',
  insert2 = 'insert2'
}

export const ViewsComponets = {
  [views.insert]: Insert,
  [views.insert2]: Insert
};

interface Props {
  view: views
}

// TODO: props 校验
export const ChildViewComponent = (props: Props) => {
  const Component = ViewsComponets[props.view];
  return <div style={{ padding: '6px' }}>
    <Component />
  </div>
}
