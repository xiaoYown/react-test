import React from 'react';
import './index.css';

import { ModalBus, ModalEvents, MouseBus, MouseEvents } from '../../../controller';
import { sidebarList } from '../setting';
import { withSidebarChild } from '../../../controller/wrapper';
import SidebarView from '..';

export type AnyComponent<P = any> =
| (new (props: P) => React.Component)
| ((props: P & { children?: React.ReactNode }) => React.ReactElement<any> | null);

export interface SideNodeProps {
  key: string;
  view: string;
  icon: string;
  title: string;
  event: string;
  active: boolean;
}

class SideNodeItem extends React.Component<SideNodeProps> {
  constructor (props: SideNodeProps) {
    super(props);
  }
  selectSideNode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (this.props.active) {
      ModalBus.emit(ModalEvents.CloseSideChild);
    } else {
      ModalBus.emit(ModalEvents.OpenSideChild, this.props);
    }
  }
  render () {
    const { title, active } = this.props;
    const className = `bb-siderbar-node ${(active ? 's-active' : 's-normal')}`;
    return <div
      className={className}
      onClick={this.selectSideNode}
      title={title}
    >{ title }</div>
  }
}

class Sidebar {

  private options: SideNodeProps[] = []

  public register(nodes: SideNodeProps[]) {
    this.options = nodes;
  }

  public init(Component: AnyComponent) {
    const { options } = this;
    const SidebarView = (props: any) => {
      console.log(props)
      return <Component
        render={() => {
          return <>
            {
              options.map((item: SideNodeProps) => <SideNodeItem {...item} active={item.key == props.view} />)
            }
          </>
        }}
      />
    }
    return withSidebarChild(SidebarView);
  }
}

const sidebar = new Sidebar();
sidebar.register(sidebarList);

export default sidebar;
