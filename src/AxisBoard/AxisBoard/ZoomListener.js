const EVENT_NAME = 'wheel';
const OPTIONS = {
  ele: null,
  zoom: 1,
  digit: 2,
  scale: () => {}
}
/**
 * @param {HTMLElement} options.ele
 * @param {number} options.zoom - 缩放值
 * @param {number} options.digit - 小数位数
 * @param {Function} options.scale - 缩放动作回调
 */
class ZoomListener {
  constructor (options) {
    if (!options.ele) {
      return console.error('options ele is must!');
    }
    this.$options = Object.assign({}, OPTIONS, options);
    this.onListenWheel();
  }
  onListenWheel () {
    const { ele } = this.$options;
    ele.addEventListener(EVENT_NAME, this.wheeling);
  }
  wheeling (event) {
    if (event.ctrlKey) {
      event.preventDefault();
      this.$options.scale(event);
      // do callback
    }
  }
  updateZoom (zoom) {
    this.$options.zoom = zoom;
  }
  destroy () {
    const { ele } = this.$options;
    ele.removeEventListener(EVENT_NAME, this.wheeling);
  }
}

export default o => new ZoomListener(o);