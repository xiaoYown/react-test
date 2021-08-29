/*
 * @Author: xiaoyown 
 * @Date: 2021-08-29 23:52:58 
 * @Last Modified by: xiaoyown
 * @Last Modified time: 2021-08-30 00:40:21
 */
import React, { ReactNode } from 'react';
import { Form, Icon, Modal } from 'antd';

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
  <Form.Item>
    {getFieldDecorator(fieldName, { initialValue })(<AnyInput />)}
  </Form.Item>
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
      <Icon type="plus-circle" style={{ color: '#1890ff' }} />
      &nbsp;
      <a href="#!">{text}</a>
    </span>
  );
};

export const ModalVisibleContext = React.createContext(false);

export const confirm = ({ title }: { title: string }) => {
  return new Promise((resolve) => {
    Modal.confirm({
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


