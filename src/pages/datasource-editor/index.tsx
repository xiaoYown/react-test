import './index.less';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Input, Button, Row, Col } from 'antd';
import { Select, createHideItem } from './custom-form-cmps';

import MethodInput from './method-input';
import { DatasourceType } from './typing';

const { TextArea } = Input;

const datasourceTypeList = [
  {
    label: '外部数据源',
    value: 'OUT',
  },
];

const accessMethodList = [
  {
    label: 'http',
    value: 'HTTP',
  },
  {
    label: '数据库直连',
    value: 'DATABASE',
  },
];

interface DatasourceEditorProps extends FormComponentProps {
  onConfirm?: (arg0: any) => void;
  datasource: DatasourceType;
}

interface IState {}

const tailFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16, offset: 1 },
};

const createRequired = (msg: string, type: string = 'string') => ({
  required: true,
  type,
  msg,
});

type MarkUffixProps = {
  len: number;
  max: number;
  markSuffix: string;
};

const InputSuffixNum = (props: {len: number, max: number}) => {
  const { len, max } = props;
  return <span
    className="datasource-input-suffix"
  >{len}/{max}</span>
}

const MarkInputSuffix = (props: MarkUffixProps) => {
  return (
    <div className="datasource-edit-mark-suffix">
      <InputSuffixNum len={props.len} max={props.max} />
      <Input disabled={true} value={`_${props.markSuffix}`} />
    </div>
  );
};

class DatasourceEditor extends Component<DatasourceEditorProps, IState> {
  render() {

    const {
      datasource,
      form: {
        getFieldDecorator,
        getFieldsValue,
      },
    } = this.props;

    const formData = {...datasource, ...getFieldsValue()};
    const datasourceName = formData.datasourceName;
    const datasourceKey = formData.datasourceKey;

    return (
      <Form>
        <div className="datasource-editor">
          <Form.Item label="数据源名称" {...tailFormItemLayout}>
            {getFieldDecorator('datasourceName', {
              initialValue: datasource.datasourceName,
              rules: [
                createRequired('数据源名称不能为空'),
                {
                  max: 20,
                  message: '最大长度不能超过 20'
                }
              ],
            })(<Input
              suffix={<InputSuffixNum
                len={datasourceName.length}
                max={20}
              />}
              autoComplete="off"
            />)}
          </Form.Item>
          <Form.Item label="数据源标识" {...tailFormItemLayout}>
            {getFieldDecorator('datasourceKey', {
              rules: [
                createRequired('数据源名称不能为空'),
                {
                  max: 20,
                  message: '最大长度不能超过 20'
                }
              ],
              initialValue: datasource.datasourceKey,
            })(
              <Input
                autoComplete="off"
                className="datasource-editor-item-mark"
                suffix={
                  <MarkInputSuffix
                    len={datasourceKey.length}
                    max={20}
                    markSuffix={datasource.datasourceKey}
                  />
                }
              />,
            )}
          </Form.Item>
          <Form.Item label="数据源描述" {...tailFormItemLayout}>
            {getFieldDecorator('datasourceDesc', {
              initialValue: datasource.datasourceDesc,
            })(<TextArea />)}
          </Form.Item>
          <Form.Item label="数据源类型" {...tailFormItemLayout}>
            {getFieldDecorator('datasourceType', {
              initialValue: datasource.datasourceType,
              rules: [createRequired('数据源类型不能为空')],
            })(<Select options={datasourceTypeList} />)}
          </Form.Item>
          <Form.Item label="接入方式" {...tailFormItemLayout}>
            {getFieldDecorator('accessMethod', {
              initialValue: datasource.accessMethod,
              rules: [createRequired('接入方式不能为空')],
            })(<Select options={accessMethodList} />)}
          </Form.Item>
          <Form.Item label="数据源管理后台" {...tailFormItemLayout}>
            {getFieldDecorator('managerWebsiteUrl', {
              initialValue: datasource.managerWebsiteUrl,
              rules: [createRequired('数据源管理后台不能为空')],
            })(
              <Input
                autoComplete="off"
                placeholder="请输入http或https开头的网页地址"
              />,
            )}
          </Form.Item>
          <Form.Item label="数据源方法" {...tailFormItemLayout}>
            {getFieldDecorator('datasourceMethodList', {
              initialValue: datasource.datasourceMethodList,
              rules: [createRequired('至少有一个数据源方法', 'array')],
            })(<MethodInput />)}
          </Form.Item>
          <div style={{ display: 'none' }}>
            {createHideItem(
              getFieldDecorator,
              'environment',
              datasource?.environment,
            )}
          </div>
          <br />
          <Row type="flex" justify="center">
            <Col>
              <Button ghost={true} type="primary" onClick={this.onHandleSave}>
                确认
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={this.onHandlePublish}
                style={{ marginLeft: '10px' }}
              >
                发布
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }

  onHandleSave = () => {
    const { onConfirm, form } = this.props;
    onConfirm && onConfirm(form.getFieldsValue());
  };
  onHandlePublish = () => {};
}

export default Form.create()(DatasourceEditor);
