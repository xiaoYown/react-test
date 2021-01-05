type Cb = () => void;

class SyntheticEvent {
  constructor () {
    this.init();
  }
  private init () {
  }
  private bind (e: 'mousedown'|'mouseup', callback: Cb) {
    window.addEventListener(e, callback);
  }
}

const syntheticEvent = new SyntheticEvent();

export default syntheticEvent;
