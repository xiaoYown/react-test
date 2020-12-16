import './index.less';
import React from 'react';

class PageAxis extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    scale: 1
  }
  static getDerivedStateFromProps (props) {
    const { width, height, scale } = props;
    return {
      deriveStyle: {
        width: width * scale + 'px',
        height: height * scale + 'px',
        backgroundColor: 'blue'
      }
    };
  }
  componentDidMount() {
  }
  render() {
    const { deriveStyle } = this.state;
    return <div className="xvf-axis-board">
      <div
        className="xvf-axis-board-canvas"
        style={deriveStyle}
      ></div>
    </div>
  }
};

export default PageAxis;
