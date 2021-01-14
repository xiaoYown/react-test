import { observable, action } from 'mobx';
import { cloneDeep } from 'lodash';
import { OperationHistory } from './OperationHistory';
import { createElementExtension } from '../../@datasource/creator';
import { updatePosValue } from '../../utils';

import reportData from '../../@datasource/report.json';

const operationHistory = new OperationHistory();

export const extensionsCache: any = {}; // 不监听
export const remoteElementsData: any = {};

interface rootCacheProps {
  sideChildShow: string
  sideChildOptions: any
  elementExtensions: any[]

  remoteReportStatus: 'NONE'|'WAIT'|'SUCCESS'|'FAIL'
  remoteReportData: any
  remoteElements: any[]

  selectedIds: string[]
}

export const rootCache: rootCacheProps = observable({
  sideChildShow: '',
  sideChildOptions: null,

  elementExtensions: <any[]> [],

  remoteReportStatus: 'NONE',
  remoteReportData: {},
  remoteElements: [], // 用作列表渲染

  selectedIds: [], // 当前所有选中对象 id
});

// TODO: any 后续处理
export const openSideChild = action('[side-child]: open', (options: any) => {
  rootCache.sideChildOptions = options;
  rootCache.sideChildShow = options.view;
});

export const closeSideChild = action('[side-child]: close', () => {
  rootCache.sideChildShow = '';
});

export const initElementExtensions = action('[extension-element]: init', (payload: any[]) => {
  payload.forEach(item => {
    extensionsCache[item.id] = item;
  });
  rootCache.elementExtensions = payload;
});
export const appendElementExtensions = action('[extension-element]: append', (payload: any) => {
  rootCache.elementExtensions.push(payload);
  extensionsCache[payload.id] = payload;
});

// 远程数据渲染
export const setRemoteData = action('Init remote data', (payload: any) => {
  operationHistory.reset();

  // const { elements } = payload;
  delete payload.elements;

  rootCache.remoteReportData = payload;
  // rootCache.remoteElements = elements.map(item => {
  // });
});

setRemoteData(reportData);

export const setSelected = action((payload: any) => {
  rootCache.selectedIds = payload;
});

// element 操作
export const insertElement = action('[extension-element]: insert element', (payload: any) => {
  const data = createElementExtension(payload);
  rootCache.remoteElements = [...rootCache.remoteElements, data.id];
  remoteElementsData[data.id] = observable(data);
  rootCache.selectedIds = [data.id];
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
export const updateElement = action('[extension-element]: update element', (payload: any) => {
  const { id, data } = payload;
  console.log(payload)
  operationHistory.do([
    {
      id,
      action: 'update',
      effect: 'element',
      data: cloneDeep(payload.data)
    }
  ]);
  for (let attrKey in data) {
    updatePosValue(remoteElementsData[id], attrKey, data[attrKey]);
  }
});

// 前进|后退
export const redo = action((payload: any) => {
});
export const undo = action((payload: any) => {
});
