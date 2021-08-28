import React from 'react';
import styles from './index.less';
import { FormComponentProps } from 'antd/lib/form';

import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

interface IProps {
  form: any;
  size: any;
  value: any;
  onChange: (value: any) => void;
}
class PriceInput extends React.Component<IProps> {
  handleNumberChange = (e: any) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = (currency: any) => {
    this.triggerChange({ currency });
  };

  triggerChange = (changedValue: any) => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  };

  render() {
    const { size, value } = this.props;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={value.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={value.currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    );
  }
}

class Demo extends React.Component {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  checkPrice = (rule: any, value: any, callback: any) => {
    if (value.number > 0) {
      return callback();
    }
    callback('Price must greater than zero!');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="Price">
          {getFieldDecorator('price', {
            initialValue: { number: 0, currency: 'rmb' },
            rules: [{ validator: this.checkPrice }],
          })(<PriceInput />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: 'customized_form_controls' })(Demo);

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <WrappedDemo />
    </div>
  );
}
