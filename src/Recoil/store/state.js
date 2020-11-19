import {
  atom,
  atomFamily,
  useSetRecoilState,
  useRecoilState,
} from 'recoil';

const stateCache = {};

export const itemFamily = atomFamily({
  key: 'itemFamily',
  default: (id) => {
    return {
      id,
      data: `data-${id}`
    }
  },
})

// export getItemKeyList = ()

export const itemKeyList = atom({
  key: 'itemKeyList',
  default: []
})

// export const itemState = atom({
//   key: 'itemState',
//   default: {}
// })

export const setItemState = ({ id, payload }) => {
  stateCache[id] = atom({
    key: `item-${id}`,
    default: payload
  })
}

export const getItemState = id => {
  if (!stateCache[id]) {
    stateCache[id] = atom({
      key: `item-${id}`,
      default: {}
    })
  }
  return stateCache[id]
}
