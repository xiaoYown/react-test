/*
 * @Author: xiaoyown 
 * @Date: 2021-08-30 00:00:31 
 * @Last Modified by: xiaoyown
 * @Last Modified time: 2021-08-30 00:04:25
 */
import { MethodType, ParamDataType, ParamType } from './typing';

export const PARAM_TYPE_MAPS = {
  STRING: {
    nameShowPrefix: '基础类型',
    nameShow: '文本',
    setting: {
      limit: {
        min: 0,
        textMin: '最小长度',
        textMax: '最大长度',
      },
    },
  },
  NUMBER: {
    setting: {
      limit: {
        textMin: '最小值',
        textMax: '最大值',
      },
    },
  },
  BOOLEAN: {
    setting: {},
  },
  OBJECT: {
    setting: {},
  },
  ARRAY: {
    setting: {},
  },
};

interface SettingType {
  limit?: {
    min?: number;
    textMin: string;
    textMax: string;
  };
}

export const getParamSetting = (paramDataType: ParamDataType): SettingType => {
  return PARAM_TYPE_MAPS[paramDataType]?.setting || {};
};

/**
 * 为新方法生成临时 methodId, 发送数据时会进行移出
 */
 const createTempMethodId = (methodList: MethodType[]): string => {
  let newId: string = String(Math.floor(Math.random() * 1000));

  if (methodList.findIndex(({ methodId }) => methodId === newId) !== -1) {
    newId = createTempMethodId(methodList);
  }
  return newId;
};

/**
 * 通过方法列表新建方法
 */
export const createNewMethod = (methodList: MethodType[]): MethodType => {
  return {
    datasourceId: 0,
    calleeBody: {},
    inParams: [],
    url: '',
    method: 'GET',
    methodId: createTempMethodId(methodList),
    methodName: ``,
    methodType: 'HTTP',
    methodKey: '',
    orgId: '',
    outParams: [],
    updator: '',
  };
};

/**
 * 新建参数
 */
export const createNewParam = (): ParamType => ({
  dataType: 'STRING',
  elementDataType: '',
  enumFlag: false,
  enums: [],
  fieldKey: '',
  fieldName: '',
  maxLen: 0,
  minLen: 0,
  objProperties: [],
  requireFlag: false,
  serialNum: 0,
  uniqueFlag: false,
  children: [],
});
