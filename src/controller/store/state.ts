import { observable, action } from 'mobx';
import { OperationHistory } from './OperationHistory';
import { createElementExtension } from '../../@datasource/creator';

import reportData from '../../@datasource/report.json';

const operationHistory = new OperationHistory();

export const itemListCache = {};

export const extensionsCache: any = {}; // 不监听

interface rootCache {
  sideChildShow: boolean
  sideChildOptions: any
  elementExtensions: any[]
  remoteReportStatus: 'NONE'|'WAIT'|'SUCCESS'|'FAIL'
  remoteReportData: any
  remoteElements: any[]
  remoteElementsData: any
}

export const rootCache: rootCache = observable({
  sideChildShow: false,
  sideChildOptions: null,

  elementExtensions: <any[]> [],

  remoteReportStatus: 'NONE',
  remoteReportData: {},
  remoteElements: [], // 用作列表渲染
  remoteElementsData: {}, // 用作单对象具象渲染
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
  payload.forEach(item => {
    extensionsCache[item.id] = item;
  });
  rootCache.elementExtensions = payload;
});
export const appendElementExtensions = action((payload: any) => {
  rootCache.elementExtensions.push(payload);
  extensionsCache[payload.id] = observable(payload);
});

// 远程数据渲染
export const setRemoteData = action((payload: any) => {
  operationHistory.reset();

  const { elements } = payload;
  delete payload.elements;

  rootCache.remoteReportData = payload;
  // rootCache.remoteElements = elements.map(item => {
  // });
});

setRemoteData(reportData);

// element 操作
export const insertElement = action((payload: any) => {
  const data = createElementExtension(payload);
  rootCache.remoteElements = [...rootCache.remoteElements, data.id];
  rootCache.remoteElementsData[data.id] = observable(data);
  // TODO: 操作记录处理
  // operationHistory.do([
  //   {
  //     action: 'insert',
  //     effect: 'element',
  //     data
  //   }
  // ])
});
export const removeElement = action((payload: any) => {
});
export const updateElement = action((payload: any) => {
});

// 前进|后退
export const redo = action((payload: any) => {
});
export const undo = action((payload: any) => {
});
