import React from 'react';
import { observer } from 'mobx-react';
import { AnyComponent } from '../../@types';
import { rootCache } from '../store/state';

import root from '../../libs/base/root';

export const withRoot = (Component: AnyComponent) => {
  return (props: any) => <Component {...props} root={root} />
}

export const withElementExtensions = (Component: AnyComponent) => {
  // TODO: any
  const Observer = observer((props: any) => {
    return <Component
      elementExtensions={props.rootCache.elementExtensions}
    />
  });
  return (props: any) => <Observer {...props} rootCache={rootCache} />
}
export const withSidebarChild = (Component: AnyComponent) => {
  // TODO: any
  const Observer = observer((props: any) => {
    console.log(props)
    return <Component
      {...props}
      visible={props.rootCache.sideChildShow}
      options={props.rootCache.sideChildOptions}
    />
  });
  return (props: any) => <Observer {...props} rootCache={rootCache} />
}

