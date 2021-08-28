import React, { ReactNode } from 'react';
import * as C from 'antd';
import { SelectProps } from 'antd/lib/select';
import { ParamEnum } from './typing';

type Option = {
  label: string;
  value: number | string;
};

interface ISelectProps extends SelectProps {
  options?: Option[];
}

export class Select extends React.Component<ISelectProps> {
  render() {
    const { options, ..._props } = this.props;
    return (
      <C.Select {..._props}>
        {options?.map(({ value, label }) => {
          return (
            <C.Select.Option key={String(value)} value={value}>
              {label}
            </C.Select.Option>
          );
        })}
      </C.Select>
    );
  }
}

/* 隐藏表单控件, 不显示字段使用 */
class AnyInput extends React.Component {
  render() {
    return null;
  }
}
/* 隐藏表单空间, 不显示字段使用 */
export const createHideItem = (
  getFieldDecorator: any,
  fieldName: string,
  initialValue: any,
): ReactNode => (
  <C.Form.Item>
    {getFieldDecorator(fieldName, { initialValue })(<AnyInput />)}
  </C.Form.Item>
);

interface AddButtonProps {
  text: string;
  onClick: () => void;
}
/* 新增按钮 */
export const AddButton = (props: AddButtonProps) => {
  const { text, onClick } = props;
  return (
    <span className="s-pointer" onClick={onClick}>
      <C.Icon type="plus-circle" style={{ color: '#1890ff' }} />
      &nbsp;
      <a href="#!">{text}</a>
    </span>
  );
};

export const ModalVisibleContext = React.createContext(false);

export const confirm = ({ title }: { title: string }) => {
  return new Promise((resolve) => {
    C.Modal.confirm({
      title,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        resolve('ok');
      },
    });
  });
};

interface EnumInputProps {
  value?: ParamEnum[];
  onChange?: (arg0: ParamEnum[]) => void;
}

export class EnumInput extends React.Component<EnumInputProps> {
  render() {
    const { value } = this.props;

    return (
      <span>
        {value
          ? value.map((item, index) => (
              <div key={index} className="datasource-param-enum-input">
                <C.Input
                  placeholder="枚举名称"
                  value={item.name}
                  onChange={(e) =>
                    this.onHandleChange(index, 'name', e.target.value)
                  }
                />
                <C.Input
                  placeholder="枚举值"
                  value={item.value}
                  onChange={(e) =>
                    this.onHandleChange(index, 'value', e.target.value)
                  }
                />
                <C.Icon
                  className="s-pointer"
                  type="plus"
                  onClick={this.onHandleAdd}
                />
              </div>
            ))
          : null}
      </span>
    );
  }
  onHandleChange = (index: number, key: string, value: string) => {
    if (!this.props.value?.length) return;
    const enums = [...this.props.value];
    const oldValue = enums[index];
    enums[index] = {
      ...oldValue,
      [key]: value,
    };
    this.triggerChange(enums);
  };

  onHandleAdd = () => {
    const value = this.props.value || [];
    this.triggerChange([...value, { name: '', value: '' }]);
  };

  triggerChange = (value: ParamEnum[]) => {
    const { onChange } = this.props;
    onChange && onChange(value);
  };
}
