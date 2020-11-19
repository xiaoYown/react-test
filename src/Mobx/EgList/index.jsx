import React from 'react';
import { observer } from 'mobx-react';
import Filler from './Filler';

import { rootCache, setCurrent, itemListCache } from './store/state';

const Item = observer(({ options, border }) => {
  const onSetCurrent = () => {
    setCurrent(options.id)
  }
  const style = { marginBottom: '10px' }
  if (border) {
    style.border = '1px solid #000000'
  }
  return <div style={style}>
    <button onClick={onSetCurrent}>select</button> &nbsp;&nbsp;&nbsp;&nbsp;
    { JSON.stringify(options) }
  </div>
})

const getItem = (id) => {
  const border = rootCache.current === id
  return <Item key={id} options={itemListCache[id]} border={border} />
}

@observer
class EgList extends React.Component {
  render () {
    const { itemIdList, current } = this.props.rootCache;
    return <div>
      <div>{ current }</div>
      <br/>
      <div>id list: { JSON.stringify(itemIdList) }</div>
      <br/>
      {
        itemIdList.map(id => getItem(id))
      }
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Filler />
    </div>
  }
}

export default () => <EgList rootCache={ rootCache } />;
