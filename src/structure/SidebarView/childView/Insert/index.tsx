import React from 'react';
import { withElementExtensions } from '../../../../controller/wapper';

class Insert extends React.Component {
  render () {
    console.log(this.props);
    return <div>插入</div>
  }
}

export default withElementExtensions(Insert);
