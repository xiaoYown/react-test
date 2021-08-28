import { ParamDataType } from './typing';

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

// export const getParamTypeName = (paramDataType: ParamDataType): string => {
//   return;
// };
