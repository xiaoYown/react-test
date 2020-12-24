import './index.less';
import React from 'react';
import AxisBoard from './AxisBoard';
import AxisScale from './AxisScale';

class PageAxisBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    scale: 1
  }
  render() {
    const { scale } = this.state;
    return <div style={{ paddingTop: '20px' }}>
      <div className="page-axis-board">
        <AxisBoard
          width={800}
          height={600}
          scale={scale}
        />
      </div>
      <AxisScale
        step={0.02}
        scale={scale}
        onChange={scale => {
          this.setState({ scale });
        }}
      />
    </div>
  }
};

export default PageAxisBoard;
