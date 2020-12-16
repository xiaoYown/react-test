import './index.less'
import React from 'react'
import AxisBoard from './AxisBoard'

class PageAxisBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    scale: 1
  }
  componentDidMount() {
  }
  render() {
    const { scale } = this.state;
    return <div className="page-axis-board">
      <AxisBoard width={800} height={800} scale={scale} />
    </div>
  }
};

export default PageAxisBoard;
