import { initElementExtensions, appendElementExtensions } from '../../../controller/store/state';
import { elementExtensions } from '../../../extensions/built-in';

class Root {
  public init () {
    initElementExtensions(elementExtensions);
  }
  public registerElementExtensions (payload: any) {
    appendElementExtensions(payload);
    // TODO:
  }
  public insertElement (payload: any) {
  }
}

const root = new Root();

root.init();

export default root;
