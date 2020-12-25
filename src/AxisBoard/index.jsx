import './index.less';
import React from 'react';
import AxisBoard from './AxisBoard';
import AxisScale from './AxisScale';

class PageAxisBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    zoom: 1
  }
  render() {
    const { zoom } = this.state;
    return <div style={{ paddingTop: '20px' }}>
      <div className="page-axis-board">
        <AxisBoard
          width={800}
          height={600}
          zoom={zoom}
        />
      </div>
      <AxisScale
        step={0.02}
        zoom={zoom}
        onChange={zoom => {
          this.setState({ zoom });
        }}
      />
    </div>
  }
};

export default PageAxisBoard;
