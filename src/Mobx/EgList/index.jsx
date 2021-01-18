import styles from './index.module.less';
import React from 'react';
import { observer } from 'mobx-react';
import Filler from './Filler';
import { rootCache, setCurrent, itemListCache } from './store/state';

const Value = (props) => {
  return <pre>{ JSON.stringify(props.value) }</pre>
}

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
    <Value options={options} />
  </div>
})

const getItem = (id) => {
  const border = rootCache.current === id
  return <Item key={id} options={itemListCache[id]} border={border} />
}

const withDataList = (Component) => {
  const Observer = observer((props) => {
    const { id } = props.oldProps;
    const border = rootCache.current === id
    return <Component {...props.oldProps} border={border} options={props.options} />
  })
  return (props) => <Observer oldProps={props} options={itemListCache[props.id]} />
}
const ItemHoc = withDataList(Item);

@observer
class EgList extends React.Component {
  render () {
    const { itemIdList, current } = this.props.rootCache;
    console.log('--------')
    return <div className={styles['eg_list']}>
      <div>{ current }</div>
      <br/>
      <div>id list: { JSON.stringify(itemIdList) }</div>
      <br/>
      {
        // itemIdList.map(id => getItem(id))
        itemIdList.map(id => <ItemHoc id={id} key={id} />)
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
