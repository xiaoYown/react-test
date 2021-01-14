import styles from './index.module.css';
import React from 'react';
import { Col, Switch, Input, InputNumber, Radio } from 'antd';
import ErrorBoundary from '../../../error/ErrorBoundary';

import { NodeProps } from '../../index';
import { extractPosValue } from '../../../../../utils';

class PanelSwitch extends React.Component<any> {
  onSave = (value: any) => {
    const { pos } = this.props;
    const { onSave } = this.props
    onSave && onSave(this.props.id, pos, value);
  }
  render () {
    const { name, value, onChange } = this.props;
    return <>
      <h5 className={styles['bb-edit-panel-item-title']}>{ name }</h5>
      <Switch size="small" checked={value} onClick={onChange} />
    </>
  }
}

class PanelInput extends React.Component<any> {
  render () {
    const { name, value, onChange } = this.props;
    return <>
      <h5 className={styles['bb-edit-panel-item-title']}>{ name }</h5>
      <Input
        style={{ width: '120px' }}
        size="small"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </>
  }
}

class PanelInputNumber extends React.Component<any> {
  render () {
    const { name, value, options, onChange } = this.props;
    return <>
      <h5 className={styles['bb-edit-panel-item-title']}>{ name }</h5>
      <InputNumber
        style={{ width: '66px' }}
        size="small"
        min={options.min}
        max={options.max}
        value={value}
        onChange={onChange}
      />
    </>
  }
}

class PanelRadio extends React.Component<any> {
  render () {
    const { name, options, value, onChange } = this.props;
    return <>
      <h5 className={styles['bb-edit-panel-item-title']}>{ name }</h5>
      <Radio.Group value={value} onChange={(e: any) => onChange(e.target.value)}>
        {
          options.map((item: any) => {
            return <Radio key={item.value} value={item.value}>{item.label}</Radio>
          })
        }
      </Radio.Group>
    </>
  }
}

export function EditPanelNode (props: NodeProps) {
  let Component: any;
  const { data, pre, pos, span, options, transvalue, onSave } = props;
  const _data = pre ? extractPosValue(data, pre.replace(/\.$/, '')) : data;
  const value = transvalue(extractPosValue(_data, pos));

  const save = (newValue: any) => {
    if (onSave && newValue !== value) {
      onSave && onSave(props.id, newValue, data);
    }
  }
  switch (props.type) {
    case 'switch':
      Component = PanelSwitch;
      break;
    case 'input':
      Component = PanelInput;
      break;
    case 'inputNumber':
      Component = PanelInputNumber;
      break;
    case 'radio':
      Component = PanelRadio;
      break;
    default:
      Component = null;
  }
  return <Col span={span || 24}>
    <div
      className={styles['bb-edit-panel-item']}
    >
      <ErrorBoundary>
        {
          Component ? <Component
            {...props}
            options={options}
            value={value}
            onChange={save}
          /> : null
        }
      </ErrorBoundary>
    </div>
  </Col>
}