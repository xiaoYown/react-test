/*
 * @Author: xiaoyown 
 * @Date: 2021-08-30 00:01:02 
 * @Last Modified by: xiaoyown
 * @Last Modified time: 2021-08-30 00:40:54
 */
import React, { Component } from 'react';
import ParamSettingInputForm, {
  SETTING_TYPE,
} from '../param-setting-input-form';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { AddButton, ModalVisibleContext, confirm } from '../components';
import { createNewParam } from '../utils';
import { ParamType } from '../typing';
import { cloneDeep } from 'lodash';
import { PARAM_DATA_TYPES } from '../constant/data-types';

interface IProps {
  value?: ParamType[];
  onChange?: (arg0: ParamType[]) => void;
}

interface IState {
  visible: boolean;
  editWay: string;
  parentFieldKey: string;
  expandParams: string[];
  editingParamData: ParamType;
}

const hasChildParam = (dataType: string): boolean =>
  ['OBJECT', 'ARRAY'].includes(dataType);

// 获取新增后参数列表
const getAddParamTree = (
  paramTree: ParamType[],
  newParam: ParamType,
  parentFieldKey: string,
): ParamType[] => {
  if (parentFieldKey) {
    for (let param of paramTree) {
      if (param.fieldKey === parentFieldKey) {
        !param.objProperties && (param.objProperties = []);
        param.objProperties.push(newParam);
        break;
      }
      if (param.objProperties) {
        param.objProperties = getAddParamTree(
          param.objProperties,
          newParam,
          parentFieldKey,
        );
      }
    }
  } else {
    paramTree.push(newParam);
  }
  return paramTree;
};
// 获取编辑更新后参数列表
const getUpdateParamThree = (paramTree: ParamType[], newParam: ParamType) => {
  for (let param of paramTree) {
    if (param.fieldKey === newParam.fieldKey) {
      Object.assign(param, newParam);
      break;
    }
    if (param.objProperties) {
      param.objProperties = getUpdateParamThree(param.objProperties, newParam);
    }
  }
  return paramTree;
};
// 整理参数列表为树形结构
function formatToThreeData(paramTree: ParamType[], parentFieldKey?: string) {
  for (let param of paramTree) {
    const { objProperties } = param;
    if (objProperties && objProperties.length) {
      let children = formatToThreeData(objProperties, parentFieldKey);
      param.children = children;
    }
  }
  return paramTree;
}
// 获取借点数量
function getTreeDataNum(paramTree: ParamType[]) {
  let num = paramTree.length;
  for (let param of paramTree) {
    num += getTreeDataNum(param.objProperties || []);
  }
  return num;
}
// 删除参数
const delParamFromTree = (paramTree: ParamType[], fieldKey: string) => {
  let index = paramTree.findIndex((param) => param.fieldKey === fieldKey);

  if (~index) {
    paramTree.splice(index, 1);
  } else {
    for (let param of paramTree) {
      delParamFromTree(param.objProperties || [], fieldKey);
    }
  }
  return paramTree;
};

/**
 * 修改 入参/出参 自定义 form 控件
 */
class ParamSettingInput extends Component<IProps, IState> {
  form: any;

  state = {
    // 显示|隐藏 右侧边参数编辑栏
    visible: false,
    // 编辑参数方式
    editWay: 'add',
    // 存在父节点时使用
    parentFieldKey: '',
    // 对象|数组 类型参数, 展开项存储
    expandParams: [],
    // 无用数据, 保证表单初始化, 后期优化可移除
    editingParamData: createNewParam(),
  };
  render() {
    const value = this.props.value || [];
    const { visible, editingParamData } = this.state;
    const _value = cloneDeep(value);
    const paramTreeData = formatToThreeData(_value || []);
    const paramNum = getTreeDataNum(value);

    const columns: ColumnProps<ParamType>[] = [
      {
        title: '字段名称',
        dataIndex: 'fieldName',
        key: 'fieldName',
        // TODO: 暂时没有样式
        // render: (text: string, row: ParamType) => <>
        //   {

        //     hasChildParam(row.dataType) ?
        //       <>
        //         <Icon
        //           className={classnames(
        //             's-pointer',
        //             'param-input-name-icon',
        //             expandParams.includes(row.fieldKey) ? 's-active' : ''
        //           )}
        //           type="caret-right"
        //           onClick={() => this.onHandleExpandParam(row)}
        //         />
        //         &nbsp;
        //       </> : null
        //   }
        //   {text}
        // </>
      },
      {
        title: '字段标识',
        dataIndex: 'fieldKey',
        key: 'fieldKey',
      },
      {
        title: '数据类型',
        dataIndex: 'dataType',
        key: 'dataType',
        render: (dataType: string) => {
          const info =
            PARAM_DATA_TYPES.find(item => item.value === dataType);
          return `${info?.typeLabel}-${info?.label}`;
        }
      },
      {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        render: (_: any, row: any) => (
          <>
            <a
              className="s-link-split"
              href="#!"
              onClick={() => this.onEditingInputParam(row)}
            >
              编辑
            </a>
            &nbsp;
            <a
              className="s-link-split"
              href="#!"
              onClick={() => this.onHandleDeleteParam(row)}
            >
              删除
            </a>
            &nbsp;
            {hasChildParam(row.dataType) ? (
              <a
                className="s-link-split"
                href="#!"
                onClick={() => this.onHandleAddChildParam(row)}
              >
                添加
              </a>
            ) : null}
          </>
        ),
      },
    ];

    return (
      <>
        <div className="method-input-bar">
          <AddButton text="新增" onClick={this.onHandleAddParam} />
          <span>共{paramNum}项</span>
        </div>
        {paramNum ? (
          <Table
            columns={columns}
            rowKey={(row) => row.fieldKey}
            pagination={false}
            dataSource={paramTreeData}
          />
        ) : null}
        <ModalVisibleContext.Consumer>
          {(modalVisible) => {
            return (
              <ParamSettingInputForm
                type={SETTING_TYPE.INPUT}
                visible={modalVisible && visible}
                datasource={editingParamData}
                wrappedComponentRef={(vn: any) => (this.form = vn?.props.form)}
                onClose={() => this.setState({ visible: false })}
                onCancel={() => this.setState({ visible: false })}
                onConfirm={this.onHandleConfirmParamData}
              />
            );
          }}
        </ModalVisibleContext.Consumer>
      </>
    );
  }

  // // 展开 对象|数组
  // onHandleExpandParam = ({ fieldKey }: ParamType) => {
  //   const expandParams = [...this.state.expandParams];
  //   const index = expandParams.findIndex(
  //     (key: string) => key === fieldKey
  //   );
  //   if (~index) {
  //     expandParams.splice(index, 1);
  //   } else {
  //     expandParams.push(fieldKey);
  //   }
  //   this.setState({ expandParams });
  // };

  // 弹出编辑参数
  popupParamDrawer = (
    editWay: string,
    param: ParamType,
    parentFieldKey: string = '',
  ) => {
    this.form.setFieldsValue(param);
    this.setState({
      visible: true,
      editWay,
      parentFieldKey,
    });
  };
  // 新增参数
  onHandleAddParam = () => {
    this.popupParamDrawer('add', createNewParam(), '');
  };
  // 新增 对象|数组 类型参数子参数
  onHandleAddChildParam = (param: ParamType) => {
    const { fieldKey } = param;
    this.popupParamDrawer('add', createNewParam(), fieldKey);
  };
  // 编辑参数
  onEditingInputParam = (param: ParamType) => {
    this.popupParamDrawer('modify', param);
  };
  // 新增|修改 参数设置
  onHandleConfirmParamData = (newParam: any) => {
    const { editWay, parentFieldKey } = this.state;
    const { value } = this.props;
    let paramTree: ParamType[] = cloneDeep(value) || [];

    if (editWay === 'add') {
      paramTree = getAddParamTree(paramTree, newParam, parentFieldKey);
    } else if (editWay === 'modify') {
      paramTree = getUpdateParamThree(paramTree, newParam);
    }
    this.triggerChange(paramTree);

    this.setState({ visible: false });
  };

  // 删除参数
  onHandleDeleteParam = ({ fieldKey, fieldName }: ParamType) => {
    confirm({
      title: `确认删除参数 "${fieldName}"`,
    }).then(() => {
      const { value } = this.props;
      const paramTree: ParamType[] = cloneDeep(value) || [];

      this.triggerChange(delParamFromTree(paramTree, fieldKey));
      if (this.form.getFieldsValue().fieldKey === fieldKey) {
        this.setState({ visible: false });
      }
    });
  };

  triggerChange = (value: ParamType[]) => {
    const { onChange } = this.props;

    onChange && onChange(value);
  };
}

export default ParamSettingInput;
