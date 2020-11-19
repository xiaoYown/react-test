import React, { Component, createRef } from 'react';
import {
  RecoilRoot,
  atom,
  atomFamily,
  useSetRecoilState,
  useRecoilState,
  useRecoilValue
} from 'recoil';
import { itemKeyList, itemFamily, getItemState } from './store/state';
import Filler from './Filler';

const Item = ({ id }) => {
  console.log('paint ', id)
  const data = useRecoilValue(getItemState(id));
  return <li>{ JSON.stringify(data, null, 2) }</li>;
}

const ItemList = () => {
  const keyList = useRecoilValue(itemKeyList);
  return <ul>
    {
      keyList.map(item => <Item key={item} id={item} />)
    }
  </ul>
}

// const getDiffItem = (newList, oldList) => {

// }

// class ItemList extends Component {
//   constructor (props) {
//     super(props);
//     this.rootRef = React.createRef();
//   }
//   componentDidMount () {

//   }
//   shouldComponentUpdate () {
//     return false
//   }
//   render () {
//     return <div ref={this.rootRef}></div>
//   }
// }

const ItemListRoot = () => {
  // const [item, setItem] = useRecoilState(getItemState(id));
  return <RecoilRoot>
    <ItemList />
    <Filler />
  </RecoilRoot>
};


export default ItemListRoot;
