/*
 * @Author: xiaoyown 
 * @Date: 2021-08-30 00:01:06 
 * @Last Modified by: xiaoyown
 * @Last Modified time: 2021-08-30 00:40:33
 */
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Radio } from 'antd';
import ParamSettingInput from '../param-setting-input';
import { createHideItem } from '../components';
import { CustomSelect } from '../components/custom-select';
import { METHOD_LIST } from '../constant/data-types';

import { MethodType } from '../typing';

interface MethodInputFormProps extends FormComponentProps {
  values?: MethodType;
}

const createRequired = (message: string) => ({ required: true, message });

const tailFormItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20, offset: 1 },
};

class MethodInputForm extends Component<MethodInputFormProps> {
  render() {
    const {
      values,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form>
        <Form.Item label="方法名称" {...tailFormItemLayout}>
          {getFieldDecorator('methodName', {
            initialValue: values?.methodName,
            rules: [createRequired('方法名称不能为空')],
          })(<Input autoComplete="off" />)}
        </Form.Item>
        <Form.Item label="方法标识" {...tailFormItemLayout}>
          {getFieldDecorator('methodKey', {
            initialValue: values?.methodKey,
            rules: [createRequired('方法标识不能为空')],
          })(<Input autoComplete="off" />)}
        </Form.Item>
        <Form.Item label="方法类型" {...tailFormItemLayout}>
          {getFieldDecorator('methodType', {
            initialValue: values?.methodType,
            rules: [createRequired('方法类型不能为空')],
          })(
            <Radio.Group>
              <Radio value="HTTP">HTTP</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="URL" {...tailFormItemLayout}>
          {getFieldDecorator('url', {
            initialValue: values?.url,
            rules: [createRequired('URL 不能为空')],
          })(<Input autoComplete="off" />)}
        </Form.Item>
        <Form.Item label="Method" {...tailFormItemLayout}>
          {getFieldDecorator('method', {
            initialValue: values?.method,
            rules: [createRequired('Method 不能为空')],
          })(<CustomSelect options={METHOD_LIST} />)}
        </Form.Item>
        <Form.Item label="入参" {...tailFormItemLayout}>
          {getFieldDecorator('inParams', {
            initialValue: values?.inParams,
          })(<ParamSettingInput />)}
        </Form.Item>
        <Form.Item label="出参" {...tailFormItemLayout}>
          {getFieldDecorator('outParams', {
            initialValue: values?.outParams,
          })(<ParamSettingInput />)}
        </Form.Item>
        {/* 部分不可修改数据定义, 仅作 form 数据读取使用 */}
        {createHideItem(getFieldDecorator, 'methodId', values?.methodId)}
        {createHideItem(getFieldDecorator, 'orgId', values?.orgId)}
        {createHideItem(getFieldDecorator, 'updator', values?.updator)}
        {createHideItem(getFieldDecorator, 'calleeBody', values?.calleeBody)}
      </Form>
    );
  }
}

export default Form.create<MethodInputFormProps>()(MethodInputForm);
