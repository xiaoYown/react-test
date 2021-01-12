export function extractPosValue (data: any, pos: string) {
  let keys: string[] = pos.split('.');
  let current: any = data;
  let key: string = '';

  while (keys.length > 0) {
    key = (keys.shift() as string);
    try {
      current = current[key];
    } catch (err) {
      keys = [];
      console.warn(err);
    }
  }
  return current;
}

function isObject (obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
export function updatePosValue (data: any, pos: string, value: any) {
  let keys: string[] = pos.split('.');
  let current: any = data;
  let key: string = '';

  while (keys.length > 0) {
    key = (keys.shift() as string);
    if (!isObject(current[key])) {
      current[key] = {}
    } else {
      current = current[key];
    }
    if (keys.length === 0) {
      current[key] = value;
    }
  }
}