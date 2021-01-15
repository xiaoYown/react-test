import React from 'react';
import { views } from '../setting';
import { ChildViewsComponets } from '../setting';

interface Props {
  view: views
}

// TODO: props 校验
export const ChildViewComponent = (props: Props) => {
  const Component = ChildViewsComponets[props.view];
  return <div style={{ padding: '6px' }}>
    {Component ? <Component /> : null}
  </div>
}
