import React from 'react';

let el = null
let elChild = null

class PageMemoryLeak extends React.Component {
  add = () => {
    if (el) return

    el = document.createElement('div')
    el.style.width = '100px'
    el.style.height = '100px'
    el.style.backgroundColor = '#CCCCCC'

    elChild = document.createElement('div')
    elChild.style.width = '50px'
    elChild.style.height = '50px'
    elChild.style.backgroundColor = '#000000'
    
    el.append(elChild)
    document.getElementById('dom-quote').append(el)
  }
  remove = () => {
    const root = document.getElementById('dom-quote')
    const { children } = root
    for (let i = children.length - 1; i > -1; i--) {
      root.removeChild(children[i])
    }

  }
  show = () => {
    console.log(el)
    console.log(elChild)
  }
  render() {
    return <div>
      <h3>脱离 DOM 的引用</h3>
      <div
        id="dom-quote"
        style={{ width: '200px', height: '200px' }}
      >

      </div>
      <button onClick={this.add}>add</button>
      <button onClick={this.remove}>remove</button>
      <button onClick={this.show}>show</button>
    </div>
  }
};


export default PageMemoryLeak;
