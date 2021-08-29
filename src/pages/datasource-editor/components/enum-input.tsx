/*
 * @Author: xiaoyown 
 * @Date: 2021-08-30 00:42:17 
 * @Last Modified by:   xiaoyown 
 * @Last Modified time: 2021-08-30 00:42:17 
 */
import React from 'react';
import { Input, Icon } from 'antd';
import { ParamEnum } from '../typing';

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
                <Input
                  style={{ width: '100px' }}
                  placeholder="枚举名称"
                  value={item.name}
                  onChange={(e) =>
                    this.onHandleChange(index, 'name', e.target.value)
                  }
                />
                <Input
                  style={{ width: '100px' }}
                  placeholder="枚举值"
                  value={item.value}
                  onChange={(e) =>
                    this.onHandleChange(index, 'value', e.target.value)
                  }
                />
                <Icon
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