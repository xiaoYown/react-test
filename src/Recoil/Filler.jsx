import React from 'react';
import ReactDOM from 'react-dom';
import {
  atom,
  atomFamily,
  useSetRecoilState,
  useRecoilState,
} from 'recoil';
import { itemKeyList, itemFamily, setItemState } from './store/state';

const Filler = () => {
  const [keyList, setKeyList] = useRecoilState(itemKeyList);
  const setItemKeyList = (id) => {
    const index = keyList.indexOf(id);
    if (!~index) {
      const _keyList = [...keyList];
      _keyList.push(id);
      setKeyList(_keyList);
      // const setItem = useSetRecoilState(itemFamily(id));
      // setItem({
      //   key: id,
      //   default: `custom-${id}`
      // });
      setItemState({ id, payload: `custom-${id}` })
    }
  }
  return ReactDOM.createPortal(<div
    style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      cursor: 'pointer'
    }}
  >
    <span onClick={() => setItemKeyList(Date.now())}>add item</span>
  </div>, document.body)
};


export default Filler;
