import Insert from './Insert';

export enum views {
  insert = 'insert'
}

export const ViewsComponets = {
  [views.insert]: Insert
};

interface Props {
  view: views
}

// TODO: props 校验
export const ChildViewComponent = (props: Props) => {
  const Component = ViewsComponets[props.view];
  return <Component />
}
