import React from 'react';
import { observer } from 'mobx-react';
import { AnyComponent } from '../../@types';
import { rootCache, extensionsCache, remoteElementsData } from '../store/state';

import root from '../../libs/base/root';

export const withRoot = (Component: AnyComponent) => {
  return (props: any) => <Component {...props} root={root} />
}

export const withElementExtensions = (Component: AnyComponent) => {
  // TODO: any
  const Observer = observer((props: any) => {
    return <Component
      {...props.oldProps}
      root={root}
      elementExtensions={props.rootCache.elementExtensions}
    />
  });
  return (props: any) => <Observer oldProps={props} rootCache={rootCache} />
}
export const withElementExtensionsNoObserver = (Component: AnyComponent) => {
  // TODO: any
  const Observer = observer((props: any) => {
    return <Component
      {...props}
      extensions={extensionsCache}
    />
  });
  return (props: any) => <Observer {...props} />
}
export const withSidebarChild = (Component: AnyComponent) => {
  // TODO: any
  const Observer = observer((props: any) => {
    return <Component
      {...props.oldProps}
      visible={props.rootCache.sideChildShow}
      options={props.rootCache.sideChildOptions}
    />
  });
  return (props: any) => <Observer oldProps={props} rootCache={rootCache} />
}

export const withElementList = (Component: AnyComponent) => {
  // TODO: any
  const Observer = observer((props: any) => {
    return <Component
      {...props.oldProps}
      elementList={props.rootCache.remoteElements}
    />
  });
  return (props: any) => <Observer oldProps={props} rootCache={rootCache} />
}
export const withElement = (Component: AnyComponent) => {
  // TODO: any
  const Observer = observer((props: any) => {
    // TODO: 后续需处理
    JSON.stringify(props.options);
    return <Component {...props.oldProps} options={props.options}/>
  });
  return (props: any) => <Observer oldProps={props} options={remoteElementsData[props.id]} />
}
export const withElementAndExtension = (Component: AnyComponent) => {
  // TODO: any
  const Observer = observer((props: any) => {
    // TODO: 后续需处理
    JSON.stringify(props.options);
    return <Component
      {...props.oldProps}
      options={props.options}
      extensions={extensionsCache}
    />
  });
  return (props: any) => <Observer oldProps={props} options={remoteElementsData[props.id]} />
}
export const withSelectedIds = (Component: AnyComponent) => {
  // TODO: any
  const Observer = observer((props: any) => {
    return <Component
      {...props.oldProps}
      selectedIds={props.rootCache.selectedIds}
    />
  });
  return (props: any) => <Observer oldProps={props} rootCache={rootCache} />
}
