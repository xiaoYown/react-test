import React, { Component } from 'react'

class PageTest extends Component {
  render() {
    const UA = navigator.userAgent;
    const IS_ISZ = /SZYSMT_(IOS|Android)/i.test(UA);
    console.log(IS_ISZ);
    return <div style={{ padding: '20px' }}>
      { navigator.userAgent }
      <br/>
      <div>是否 i深职院 : { IS_ISZ.toString() }</div>
    </div>
  }
};

export default PageTest;
