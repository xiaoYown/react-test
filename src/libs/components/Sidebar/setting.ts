import { SideNodeProps } from '../Sidebar';
import { ModalEvents } from '../../../controller';
import { translator } from '../../../i18n';

import Insert from './ChildView/Insert';

export enum views {
  insert = 'insert',
  insert2 = 'insert2'
}

const baseExtInsert: SideNodeProps = {
  key: views.insert,
  view: views.insert,
  icon: 'none',
  title: translator('sidebar.insert'),
  event: ModalEvents.OpenSideChild,
  active: false
};

const baseExtInsert2: SideNodeProps = {
  key: views.insert2,
  view: views.insert2,
  icon: 'none',
  title: translator('sidebar.insert'),
  event: ModalEvents.OpenSideChild,
  active: false
};

export const ChildViewsComponets = {
  [views.insert]: Insert,
  [views.insert2]: Insert
};

export const sidebarList = [
  baseExtInsert,
  baseExtInsert2
]