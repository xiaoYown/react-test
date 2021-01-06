import { observable, action } from 'mobx';

export const itemListCache = {}

export const rootCache = observable({
  sideChildShow: false,
  sideChildOptions: null,

  elementExtensions: <any[]> [],
});

// TODO: any 后续处理
export const openSideChild = action((options: any) => {
  rootCache.sideChildOptions = options;
  rootCache.sideChildShow = true;
});

export const closeSideChild = action(() => {
  rootCache.sideChildShow = false;
});

export const initElementExtensions = action((payload: any[]) => {
  rootCache.elementExtensions = payload;
});
export const appendElementExtensions = action((payload: any) => {
  rootCache.elementExtensions.push(payload);
});
