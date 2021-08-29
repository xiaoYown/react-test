/*
 * @Author: xiaoyown 
 * @Date: 2021-08-30 00:00:45 
 * @Last Modified by:   xiaoyown 
 * @Last Modified time: 2021-08-30 00:00:45 
 */
export type ParamDataType =
  | 'STRING'
  | 'BOOLEAN'
  | 'NUMBER'
  | 'OBJECT'
  | 'ARRAY';

export type ParamEnum = {
  name: string;
  value: string;
};

export type ParamType = {
  dataType: ParamDataType;
  minLen: number;
  maxLen: number;
  elementDataType: string;
  enumFlag: boolean;
  enums: ParamEnum[];
  fieldKey: string;
  fieldName: string;
  objProperties?: ParamType[];
  requireFlag: boolean;
  serialNum: number;
  uniqueFlag: boolean;
  // table columns 处理
  actions?: any;
  // table 子字段处理
  parentFieldKey?: string;
  children?: ParamType[];
};

type MethodWay = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type CalleeBody = {
  url?: string;
  method?: MethodWay;
  // query: { key: string, value: any }[];
  // body: {
  //   content: string;
  //   contentType: string;
  // }
};

export interface MethodType {
  calleeBody: CalleeBody;
  datasourceId: number;
  inParams: ParamType[];
  methodId?: number | string; // 新增时发送数据为空
  methodKey: string;
  methodName: string;
  methodType: 'HTTP';
  orgId: string;
  outParams: ParamType[];
  updator: string;
  // 数据格式转换属性
  url?: string;
  method?: MethodWay;
  // table columns 处理
  actions?: any;
}

export interface DatasourceType {
  creator: string;
  datasourceId: number;
  accessMethod: 'HTTP' | 'DATABASE';
  datasourceDesc: string;
  datasourceKey: string;
  datasourceName: string;
  datasourceType: 'OUT';
  environment: 'TEST' | 'PROD';
  managerWebsiteUrl: string;
  orgId: string;
  updator: string;
  datasourceMethodList: MethodType[];
}
