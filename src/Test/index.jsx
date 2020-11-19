import React from 'react';
import ReactDOM from 'react-dom';

class PageTest extends React.Component {
  changeTitle (title) {
    document.querySelector('title').innerHTML = title
  }
  render() {
    let a = {}
    return ReactDOM.createPortal(<div>
      <span onClick={() => this.changeTitle(1111)}>1111</span>
      <span onClick={() => this.changeTitle(2222)}>2222</span>
      <span>{ true } { undefined }</span>
    </div>, document.body)
  }
};


export default PageTest;
