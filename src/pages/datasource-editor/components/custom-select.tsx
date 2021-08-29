/*
 * @Author: xiaoyown 
 * @Date: 2021-08-30 00:42:13 
 * @Last Modified by:   xiaoyown 
 * @Last Modified time: 2021-08-30 00:42:13 
 */
import React from 'react';
import { SelectProps } from 'antd/lib/select';
import { Select } from 'antd';

type Option = {
  label: string;
  value: number | string;
};

interface ISelectProps extends SelectProps {
  options?: Option[];
}

export class CustomSelect extends React.Component<ISelectProps> {
  render() {
    const { options, ..._props } = this.props;
    return (
      <Select {..._props}>
        {options?.map(({ value, label }) => {
          return (
            <Select.Option
              key={String(value)}
              value={value}
            >
              {label}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}