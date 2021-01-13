import { SideNodeProps } from './sidebar';
import { views } from './childView';
import { ModalEvents } from '../../controller';

const baseExtInsert: SideNodeProps = {
  key: views.insert,
  view: views.insert,
  icon: 'none',
  title: '插入',
  event: ModalEvents.OpenSideChild,
  active: false
};

const baseExtInsert2: SideNodeProps = {
  key: views.insert2,
  view: views.insert2,
  icon: 'none',
  title: '插入',
  event: ModalEvents.OpenSideChild,
  active: false
};

export const sidebarList = [
  baseExtInsert,
  baseExtInsert2
]