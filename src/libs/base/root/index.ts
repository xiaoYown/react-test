import { initElementExtensions, appendElementExtensions } from '../../../controller/store/state';
import { elementExtensions } from '../../../extensions/built-in';

class Root {
  public init () {
    initElementExtensions(elementExtensions);
  }
  public insert (payload: any) {
    appendElementExtensions(payload);
    // TODO:
  }
  public registerElementExtensions (payload: any) {
  }
}

const root = new Root();

export default root;
