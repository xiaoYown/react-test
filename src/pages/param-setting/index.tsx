import { Component } from 'react';
import styles from './index.less';

import ParamSettingDrawer, { SETTING_TYPE } from './param-setting-drawer';

const datasource1 = {
  name: '111',
  name_zh: '一',
  // minLen: 0,
  // maxLen: 0
};
const datasource2 = {
  name: '222',
  name_zh: '二',
  minLen: 2,
  maxLen: 10,
};

interface IProps {}

interface IState {}

class ParamSetting extends Component<IProps, IState> {
  form: any;

  state = {
    visible: true,
    datasource: datasource1,
  };

  render() {
    const { visible, datasource } = this.state;

    return (
      <div>
        <ParamSettingDrawer
          visible={visible}
          type={SETTING_TYPE.INPUT}
          datasource={datasource}
          wrappedComponentRef={(res: any) => (this.form = res?.props.form)}
          onClose={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
          onConfirm={this.onConfirm}
        />
        <button onClick={() => this.setState({ visible: !visible })}>
          switch
        </button>
        <button onClick={() => this.updateDatasource(1)}>datasource1</button>
        <button onClick={() => this.updateDatasource(2)}>datasource2</button>
      </div>
    );
  }

  updateDatasource = (n: number) => {
    const datasource = n === 1 ? datasource1 : datasource2;

    this.form.setFieldsValue(datasource);
  };

  onConfirm = (values: any) => {
    console.log(values);
  };
}

export default ParamSetting;
