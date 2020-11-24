import React from "react";
import memoize from "memoize-one";

// const memoize = (fn) => {
//   let store = {};
//   return (...args) => {
//     let key = JSON.stringify([...args])
//     let res = store[key]
//     if (!res) {
//       res = fn(...args);
//       store[key] = res
//     }
//     return res;
//   }
// }

const calNative = (n, i) => {
  console.log(n)
  return n + i + 1
}

const calOpt = memoize(calNative)

calOpt(1, 1)
calOpt(1, 1)
calOpt(2, 1)
calOpt(2, 1)
calOpt(3, 1)
calOpt(3, 1)

function fib(n) {
  if (typeof n !== 'number') {
    return console.error('param must be int')
  }
  if (n < 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2);
}

const createFibOpt = () => {
  let store = {}
  return function _fib (n) {
    if (store[n]) {
      return store[n]
    }
    
    let res = 0
    if (n < 2) {
      res = n
    } else {
      res = _fib(n - 1) + _fib(n - 2)
    }
    store[n] = res
    return res;
  }
}

const fibOpt = createFibOpt();

class PageAlgorithm extends React.Component {
  state = {
    fibParam: 16,
    timeRec: 0,
    timeOpt: 0,
  }
  
  calFib = () => {
    const fibParam = this.state.fibParam;
    let time = 0, timeRec = 0, timeOpt = 0;
    
    console.log(1)
    time = Date.now();
    console.log(fib(fibParam));
    timeRec = Date.now() - time;
    
    console.log(2)
    time = Date.now();
    console.log(fibOpt(fibParam));
    timeOpt =  Date.now() - time;

    time = Date.now();

    this.setState({ timeRec, timeOpt });
  }
  render() {
    const { timeRec, timeOpt, fibParam } = this.state;

    return <div className="page-Algorithm" style={{ padding: '20px' }}>
      <div>
        <h3>斐波拉契</h3>
        <div>
          <span>入参 : </span>
          <span>int: </span>
          <input
            type="text"
            value={ fibParam }
            onChange={ e => this.setState({ fibParam: parseInt(e.target.value) }) }
          />
        </div>
        <div>
          <span>递归耗时 : </span>
          <span>{ timeRec }ms</span>
        </div>
        <div>
          <span>优化耗时 : </span>
          <span>{ timeOpt }ms</span>
        </div>
        <button onClick={this.calFib}>计算</button>
      </div>
    </div>;
  }
}

export default PageAlgorithm;
