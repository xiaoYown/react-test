import React, { Component } from 'react';
import DatasourceEditor from './index';
import { cloneDeep } from 'lodash';

import { ParamType, DatasourceType, MethodType } from './typing';

const getInputParams = (): ParamType => ({
  dataType: 'OBJECT',
  elementDataType: 'string',
  enumFlag: false,
  enums: [],
  fieldKey: 'string' + Math.floor(Math.random() * 1000),
  fieldName: 'string' + Math.floor(Math.random() * 1000),
  maxLen: 0,
  minLen: 0,
  objProperties: [],
  requireFlag: false,
  serialNum: 0,
  uniqueFlag: false,
});

const getOuputParams = (): ParamType => ({
  dataType: 'STRING',
  elementDataType: 'string',
  enumFlag: true,
  enums: [{ name: '1323', value: '23434' }],
  fieldKey: 'string' + Math.floor(Math.random() * 1000),
  fieldName: 'string' + Math.floor(Math.random() * 1000),
  maxLen: 0,
  minLen: 0,
  // objProperties: [],
  requireFlag: false,
  serialNum: 0,
  uniqueFlag: false,
});

const datasourceTmp: DatasourceType = {
  creator: 'string',
  datasourceId: 0,
  accessMethod: 'HTTP',
  datasourceDesc: 'string',
  datasourceKey: 'string',
  datasourceName: 'string',
  datasourceType: 'OUT',
  environment: 'TEST',
  managerWebsiteUrl: 'https://www.baidu.com',
  orgId: 'string',
  updator: 'string',
  datasourceMethodList: [
    {
      datasourceId: 0,
      calleeBody: {
        url: 'www.baidu.com',
        method: 'POST',
      },
      inParams: [getInputParams()],
      methodId: 0,
      methodName: '方法 - 1',
      methodType: 'HTTP',
      methodKey: 'key-1',
      orgId: 'string',
      outParams: [getOuputParams()],
      updator: 'string',
    },
    {
      calleeBody: {
        url: 'www.baidu.com',
        method: 'GET',
      },
      datasourceId: 0,
      inParams: [getInputParams()],
      methodId: 1,
      methodName: '方法 - 2',
      methodType: 'HTTP',
      methodKey: 'key-2',
      orgId: 'string',
      outParams: [getOuputParams()],
      updator: 'string',
    },
  ],
};

const formatDatasourceOriginal = (ds: DatasourceType): DatasourceType => {
  const res = cloneDeep(ds);

  res.datasourceMethodList.forEach((methodData: MethodType) => {
    methodData.url = methodData.calleeBody.url;
    methodData.method = methodData.calleeBody.method;
    delete methodData.calleeBody.url;
    delete methodData.calleeBody.method;
  });
  return res;
};

const formatDatasourceRequest = (ds: DatasourceType): DatasourceType => {
  const res = cloneDeep(ds);

  res.datasourceMethodList.forEach((methodData: MethodType) => {
    methodData.calleeBody.url = methodData.url;
    methodData.calleeBody.method = methodData.method;
    delete methodData.url;
    delete methodData.method;
    typeof methodData.methodId === 'string' && delete methodData.methodId;
  });
  return res;
};

class ParamSetting extends Component {
  form: any;

  state = {
    visible: false,
  };

  render() {
    const datasource = formatDatasourceOriginal(datasourceTmp);

    return (
      <div>
        <DatasourceEditor datasource={datasource} onConfirm={this.onConfirm} />
      </div>
    );
  }

  onConfirm = (values: any) => {
    console.log(values);
    console.log(formatDatasourceRequest(values));
  };
}

export default ParamSetting;
