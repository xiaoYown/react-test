/*
 * @Author: qinzhenya 
 * @Date: 2021-08-29 15:11:48 
 * @Last Modified by: xiaoyown
 * @Last Modified time: 2021-08-30 00:41:01
 */
import React, { Component } from 'react';
import { Drawer, Form, Input, InputNumber, Radio, Button } from 'antd';
import { createHideItem } from '../components';
import { EnumInput } from '../components/enum-input';
import { CustomSelect } from '../components/custom-select';
import { getParamSetting } from '../utils';
import { PARAM_DATA_TYPES } from '../constant/data-types';

import { ParamEnum, ParamType } from '../typing';

type EventType =
  | React.MouseEvent<HTMLDivElement>
  | React.MouseEvent<HTMLButtonElement>;

export enum SETTING_TYPE {
  INPUT = 'input',
  OUTPUT = 'output',
}

const TYPES_VIEW = {
  [SETTING_TYPE.INPUT]: {
    title: '入参设置',
    hasMap: false,
  },
  [SETTING_TYPE.OUTPUT]: {
    title: '出参设置',
    hasMap: true,
  },
};

interface ParamSettingInputFormProps {
  form: any;
  type: SETTING_TYPE;
  datasource?: ParamType;
  visible?: boolean;
  onClose?: (e: EventType) => void;
  onConfirm?: (d: ParamType) => void;
  onCancel?: () => void;
}

interface IState { }

const tailFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16, offset: 2 },
};

const createRequired = (message: string) => ({ required: true, message });

const dataTypeOptions: Record<string, string[]> = {
  fieldName: ['STRING', 'BOOLEAN', 'NUMBER', 'OBJECT', 'ARRAY'],
  fieldKey: ['STRING', 'BOOLEAN', 'NUMBER', 'OBJECT', 'ARRAY'],
  dataType: ['STRING', 'BOOLEAN', 'NUMBER', 'OBJECT', 'ARRAY'],
  elementDataType: ['ARRAY'],
  minLen: ['STRING', 'NUMBER'],
  maxLen: ['STRING', 'NUMBER'],
  requireFlag: ['STRING', 'BOOLEAN', 'NUMBER', 'OBJECT', 'ARRAY'],
  uniqueFlag: ['STRING', 'BOOLEAN', 'NUMBER', 'OBJECT', 'ARRAY'],
  enumFlag: ['STRING', 'BOOLEAN', 'NUMBER', 'OBJECT', 'ARRAY'],
  enums: ['STRING', 'BOOLEAN', 'NUMBER', 'OBJECT', 'ARRAY'],
  objProperties: ['OBJECT', 'ARRAY'],
  serialNum: ['STRING', 'BOOLEAN', 'NUMBER', 'OBJECT', 'ARRAY'],
};

const hasOption = (field: string, dataType: string): boolean => {
  const allowTypes = dataTypeOptions[field] || [];
  return allowTypes.includes(dataType)
};

class ParamSettingInputForm extends Component<
  ParamSettingInputFormProps,
  IState
> {
  render() {
    const { type, visible, datasource, onClose, onCancel } = this.props;
    const view = TYPES_VIEW[type];
    const {
      form: { getFieldDecorator, getFieldsValue },
    } = this.props;

    const viewCondition = getFieldsValue([
      'dataType',
      'minLen',
      'maxLen',
      'enumFlag',
    ]);

    const curDataType = viewCondition.dataType;
    const curTypeSetting = getParamSetting(curDataType);
    const maxLen = viewCondition?.maxLen || datasource?.maxLen;
    const minLen = viewCondition?.minLen || datasource?.minLen || 0;
    const { enumFlag } = viewCondition;

    const hasLimit = !!curTypeSetting?.limit;

    const useDataTypeOptions = [...PARAM_DATA_TYPES];

    if (curDataType === 'ARRAY') {
      useDataTypeOptions.splice(4, 1);
    }

    return (
      <>
        <Drawer
          className="datasource-editor-drawer"
          visible={visible}
          mask={false}
          title={view.title}
          width={450}
          placement="right"
          onClose={onClose}
        >
          <Form>
            <Form.Item label="字段名称" {...tailFormItemLayout}>
              {getFieldDecorator('fieldName', {
                initialValue: datasource?.fieldName,
                rules: [
                  {
                    type: 'string',
                    max: 20,
                    message: '字段名称最大长度为 20',
                  },
                  createRequired('字段名不能为空'),
                ],
              })(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="字段标识" {...tailFormItemLayout}>
              {getFieldDecorator('fieldKey', {
                initialValue: datasource?.fieldKey,
                rules: [createRequired('字段标识不能为空')],
              })(<Input autoComplete="off" />)}
            </Form.Item>
            <Form.Item label="数据类型" {...tailFormItemLayout}>
              {getFieldDecorator('dataType', {
                initialValue: datasource?.dataType || PARAM_DATA_TYPES[0].value,
                rules: [createRequired('')],
              })(
                <CustomSelect options={PARAM_DATA_TYPES} />,
              )}
            </Form.Item>
            {
              hasOption('elementDataType', curDataType) ?
                <Form.Item label="元素类型" {...tailFormItemLayout}>
                  {getFieldDecorator('elementDataType', {
                    initialValue: datasource?.elementDataType,
                    rules: [createRequired('元素类型不能为空')],
                  })(
                    <CustomSelect options={useDataTypeOptions} />,
                  )}
                </Form.Item> : null
            }
            {
              hasOption('minLen', curDataType) ?
                <Form.Item
                  label={curTypeSetting.limit?.textMin}
                  {...tailFormItemLayout}
                >
                  {getFieldDecorator('minLen', {
                    initialValue: datasource?.minLen,
                  })(
                    <InputNumber min={0} max={maxLen} step={1} precision={0} />,
                  )}
                </Form.Item> : null
            }
            {
              hasOption('maxLen', curDataType) ?
                <Form.Item
                  label={curTypeSetting.limit?.textMax}
                  {...tailFormItemLayout}
                >
                  {getFieldDecorator('maxLen', {
                    initialValue: datasource?.maxLen,
                  })(<InputNumber min={minLen} step={1} precision={0} />)}
                </Form.Item> : null
            }
            <Form.Item label="是否必填" {...tailFormItemLayout}>
              {getFieldDecorator('requireFlag', {
                initialValue: datasource?.requireFlag || false,
              })(
                <Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label="是否唯一" {...tailFormItemLayout}>
              {getFieldDecorator('uniqueFlag', {
                initialValue: datasource?.uniqueFlag || false,
              })(
                <Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label="是否枚举" {...tailFormItemLayout}>
              {getFieldDecorator('enumFlag', {
                initialValue: datasource?.enumFlag || false,
              })(
                <Radio.Group onChange={this.onChangeEnumFlag}>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            {
              enumFlag ?
                <Form.Item
                  className="s-hide-label"
                  label=" "
                  {...tailFormItemLayout}
                >
                  {getFieldDecorator('enums', {
                    initialValue: datasource?.enums,
                    rules: [{ validator: this.checkEnums }],
                  })(<EnumInput />)}
                </Form.Item>
                : null
            }
            {
              hasOption('objProperties', curDataType) ?
                createHideItem(
                  getFieldDecorator, 'objProperties', datasource?.objProperties,
                ) : null
            }
            {/* 部分不可修改数据定义, 仅作 form 数据读取使用 */}
            {
              createHideItem(
                getFieldDecorator, 'serialNum', datasource?.serialNum,
              )
            }
            {view.hasMap ? <span>映射</span> : null}
            <Button
              type="primary"
              onClick={this.onConfirm}
              style={{ marginRight: '10px' }}
            >
              确认
            </Button>
            <Button type="ghost" onClick={onCancel}>
              取消
            </Button>
          </Form>
        </Drawer>
      </>
    );
  }

  checkEnums = (rule: any, value: ParamEnum[], callback: any) => {
    let hasEmpty = false;
    for (let item of value) {
      hasEmpty = !item.name || !item.value;
    }
    if (hasEmpty) {
      return callback('枚举不能为空');
    }
    callback();
  };

  onChangeEnumFlag = (e: any) => {
    const { value } = e.target;
    const { form } = this.props;
    const enums = form.getFieldValue('enums');

    if (value && !enums || !enums.length) {
      form.setFieldsValue({
        enums: [{ name: '', value: '' }],
      });
    }
  };

  onConfirm = () => {
    const { form, onConfirm } = this.props;

    form.validateFields((errors: any, values: any) => {
      !errors && onConfirm && onConfirm(values);
    });
  };
}

export default Form.create<ParamSettingInputFormProps>()(ParamSettingInputForm);
