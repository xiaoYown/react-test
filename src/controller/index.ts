import EventEmitter from 'eventemitter3';
import { openSideChild, closeSideChild } from './store/state';

export enum ModalEvents {
  OpenSideChild='sideChild.open',
  CloseSideChild='sideChild.close'
}

/* 弹出层事件 */
export const ModalBus = new EventEmitter();

ModalBus.on(ModalEvents.OpenSideChild, openSideChild);
ModalBus.on(ModalEvents.CloseSideChild, closeSideChild);

export enum MouseEvents {
  click='click'
}

/* 鼠标事件 */
export const MouseBus = new EventEmitter();

type EventType = MouseEvents.click; // | ...
type Cb = (event: any) => void;

type ListnerType = {
  name: EventType
  cb: Cb
}

function on (name: EventType, cb: Cb) {
  window.addEventListener(name, cb);
}

const MouseEventList: ListnerType[] = [
  {
    name: MouseEvents.click,
    cb: (event: any) => MouseBus.emit(MouseEvents.click, event)
  }
]

MouseEventList.forEach((e: ListnerType) => on(e.name, e.cb));

/* element 扩展事件 */
export const ElementEventBus = new EventEmitter();
