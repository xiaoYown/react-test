import React from 'react';
import styles from './index.module.css';

export type AnyComponent<P = any> =
| (new (props: P) => React.Component)
| ((props: P & { children?: React.ReactNode }) => React.ReactElement<any> | null);

export interface SideNodeProps {
  key: string;
  icon: string;
  title: string;
}

class SideNodeItem extends React.Component<SideNodeProps> {
  constructor (props: SideNodeProps) {
    super(props);
  }
  selectSideNode = () => {
  }
  render () {
    const { title } = this.props
    return <div
      className={styles['bb-siderbar-node']}
      onClick={this.selectSideNode}
      title={title}
    >{ title }</div>
  }
}

class Sidebar {

  private options: SideNodeProps[] = []

  public register(node: SideNodeProps) {
    this.options.push(node);
  }

  public init(Component: AnyComponent) {
    const { options } = this;
    return class SidebarView extends React.Component {
      render () {
        return <Component
          render={() => {
            return <>
              {
                options.map((item: SideNodeProps) => <SideNodeItem {...item} />)
              }
            </>
          }}
        />
      }
    }
  }
}

export default new Sidebar();
