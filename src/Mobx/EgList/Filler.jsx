import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

import { appendItem, itemListCache, rootCache, updateItem } from './store/state';

let num = 0;

const Filler = observer(props => {
  const { itemListCache, rootCache } = props
  const { current } = rootCache
  const initialVal = itemListCache[current] ? itemListCache[current].value : ''
  // console.log(initialVal)
  const [value, setValue] = useState(initialVal)

  const onHandleChange = (e) => {
    setValue(e.target.value)
  }
  const onConfirmValue = () => {
    // itemListCache[current].modify(value)
    updateItem(current, value)
  }

  return ReactDOM.createPortal(<div
    style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      cursor: 'pointer'
    }}
  >
    <button
      onClick={() => {
        appendItem(++num)
      }}
    >add item</button>
    <br/>
    <br/>
    <input type="text" value={value} onChange={onHandleChange} />
    <br/>
    <br/>
    <button onClick={onConfirmValue}>change id - {rootCache.current} value</button>
  </div>, document.body)
});


export default () => <Filler itemListCache={itemListCache} rootCache={rootCache} />;
