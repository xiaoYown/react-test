import React, { Component } from 'react';
import { Table, Modal, Icon } from 'antd';
import { ColumnProps } from 'antd/es/table';

import MethodInputForm from '../method-input-form';
import { AddButton, confirm } from '../custom-form-cmps';
import { MethodType } from '../typing';
import { ModalVisibleContext } from '../custom-form-cmps';
import { cloneDeep } from 'lodash';

interface IProps {
  value?: MethodType[];
  onChange?: any;
}

interface IState {}

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
const createNewMethod = (methodList: MethodType[]): MethodType => {
  return {
    datasourceId: 0,
    calleeBody: {},
    inParams: [],
    url: '',
    method: 'GET',
    methodId: createTempMethodId(methodList),
    methodName: `方法 - ${Date.now()}`,
    methodType: 'HTTP',
    methodKey: 'key-1',
    orgId: '',
    outParams: [],
    updator: '',
  };
};

/**
 * 修改方法自定义 form 控件
 */
class MethodInput extends Component<IProps, IState> {
  form: any;
  state = {
    editingMethodId: '',
  };

  render() {
    const { value } = this.props;
    const { editingMethodId } = this.state;

    const editingMethodData = value?.find(
      ({ methodId }) => methodId === editingMethodId,
    );
    const modalTitle = editingMethodData ? (
      editingMethodData.methodName
    ) : (
      <span>&nbsp;</span>
    );
    const modalVisible = !!editingMethodData;

    const columns: ColumnProps<MethodType>[] = [
      {
        title: '方法名',
        dataIndex: 'methodName',
        key: 'methodName',
      },
      {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (_: any, row: any) => {
          return (
            <>
              <a
                className="method-input-opt "
                href="#!"
                onClick={() => {
                  this.setEditingMethod(row);
                }}
              >
                编辑
              </a>
              <a
                className="method-input-opt"
                href="#!"
                onClick={() => {
                  this.onHandleDeleteParam(row);
                }}
              >
                删除
              </a>
            </>
          );
        },
      },
    ];

    return (
      <>
        <div className="method-input-bar">
          <AddButton text="新增方法" onClick={this.onHandleAddMethod} />
          <Icon
            type="download"
            className="s-pointer"
            onClick={this.onHandleExport}
          />
        </div>
        {value?.length ? (
          <Table
            rowKey={(row) => String(row.methodId)}
            columns={columns}
            dataSource={value}
            pagination={false}
          />
        ) : null}
        <Modal
          className="datasource-editor-modal"
          title={modalTitle}
          visible={modalVisible}
          width={800}
          bodyStyle={{
            maxHeight: '600px',
            overflowY: 'auto',
          }}
          onCancel={() => this.onHandleCancel()}
          onOk={this.onHandleConfirm}
        >
          <ModalVisibleContext.Provider value={modalVisible}>
            <MethodInputForm
              values={editingMethodData}
              wrappedComponentRef={(res: any) => (this.form = res?.props.form)}
            />
          </ModalVisibleContext.Provider>
        </Modal>
      </>
    );
  }

  getEditingIndex = (): number => {
    const { editingMethodId } = this.state;
    const { value } = this.props;
    const editingIndex = value?.findIndex(
      ({ methodId }) => methodId === editingMethodId,
    );
    return editingIndex || 0;
  };

  setEditingMethod = ({ methodId }: MethodType) => {
    const { value } = this.props;
    const newValues = value?.find((item) => item.methodId === methodId);

    this.setState({ editingMethodId: methodId }, () => {
      this.form && this.form.setFieldsValue(newValues);
    });
  };

  // 新增方法
  onHandleAddMethod = () => {
    const { value } = this.props;
    const _value: MethodType[] = cloneDeep(value) || [];

    _value.push(createNewMethod(_value));
    this.triggerChange(_value);
  };
  // 删除方法
  onHandleDeleteParam = ({ methodId, methodName }: MethodType) => {
    confirm({
      title: `确认删除参数 "${methodName}"`,
    }).then(() => {
      const { value } = this.props;
      const _value: MethodType[] = cloneDeep(value) || [];
      const index = _value?.findIndex((item) => item.methodId === methodId);
      typeof index !== 'undefined' && _value?.splice(index, 1);

      this.triggerChange(_value);
    });
  };
  onHandleExport = () => {};

  onHandleCancel = () => {
    this.setState({ editingMethodId: '' });
  };

  onHandleConfirm = () => {
    this.form.validateFields((errors: any, values: MethodType) => {
      if (errors) return;

      const { value, onChange } = this.props;
      const newValue = cloneDeep(value) || [];
      const editingIndex = this.getEditingIndex();

      // 更新数组数据
      if (editingIndex < 0) return;
      newValue[editingIndex] = { ...values };

      onChange([...newValue]);

      this.setState({ editingMethodId: '' });
    });
  };

  triggerChange = (value: MethodType[]) => {
    const { onChange } = this.props;

    onChange && onChange(value);
  };
}

export default MethodInput;
