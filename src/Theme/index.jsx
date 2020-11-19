import React from 'react';
import { Button, Select } from 'antd';
// import './index.less';

class PageTheme extends React.Component {
  render () {
    return <div>
      <h3>Button</h3>
      <div>
        <Button type="primary">primary</Button>
        <Button danger>danger</Button>
        <Button ghost>ghost</Button>
        <Select />
      </div>
    </div>;
  }
}

export default PageTheme;