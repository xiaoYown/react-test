import { observable, action } from 'mobx';

export const itemListCache = {}

export const rootCache = observable({
  itemIdList: [],
  current: -1
});

const createItemData = (id) => {
  return {
    id,
    create_time: Date.now(),
    name: 'name ' + id,
    value: 0,
    inner: {
      time: 0
    }
  }
}

export const setCurrent = action(id => {
  rootCache.current = id
})

// const createItemModify = (id) => {
//   return action(value => {
//     console.log(id, value)
//     itemListCache[id].value = value
//   })
// }
function update (data, value) {
  data.value = value
  data.inner.time = Date.now()
}
export const updateItem = action((id, value) => {
  console.log(id, value)
  // itemListCache[id].value = value
  // itemListCache[id].inner.time = Date.now()
  update(itemListCache[id], value)
})

export const appendItem = action((id) => {
  rootCache.current = id
  itemListCache[id] = observable(createItemData(id))
  // itemListCache[id].modify = createItemModify(id)
  rootCache.itemIdList = [...rootCache.itemIdList, id]
});
