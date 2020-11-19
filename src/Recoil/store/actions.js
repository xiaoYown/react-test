const stateCache = {};
export const getItemState = id => {
  if (!stateCache[id]) {
    stateCache[id] = atom({
      key: `item-${id}`,
      default: {}
    })
  }
  return stateCache[id]
}
