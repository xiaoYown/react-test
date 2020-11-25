import React from 'react';
import ReactDOM from 'react-dom';

class PageTest extends React.Component {
  state = {
    title: ''
  }
  componentDidMount () {
    // Mutation Events
    document.addEventListener("DOMSubtreeModified", function(e){
      console.log('mutation events:')
      console.log(e)
    }, false);
    // Mutation Observer
    new MutationObserver((records, itself) => {
      console.log('mutation observer:')
      console.log(records)
      console.log(itself)
    })
  }
  changeTitle (title) {
    document.querySelector('title').innerHTML = title
    // this.setState({ title })
  }
  render() {
    const { title } = this.state;
    return ReactDOM.createPortal(<div>
      <h2>{ title }</h2>
      <button onClick={() => this.changeTitle(1111)}>1111</button>
      <button onClick={() => this.changeTitle(2222)}>2222</button>
    </div>, document.body)
  }
};


export default PageTest;
