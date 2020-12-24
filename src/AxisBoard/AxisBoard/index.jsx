import './index.less';
import React from 'react';

class PageAxis extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {}
  static getDerivedStateFromProps (props) {
    const { width, height, scale } = props;
    return {
      containerStyle: {
        width: width * scale + 'px',
      },
      canvasStyle: {
        width: width * scale + 'px',
        height: height * scale + 'px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }
    };
  }
  componentDidMount() {
  }
  render() {
    const {
      canvasStyle,
      containerStyle
    } = this.state;

    return <div className="xvd-free-axis-board">
      <div
        className="xvd-free-axis-board-container"
        style={containerStyle}
      >
        <div
          className="xvd-free-axis-board-canvas"
          style={canvasStyle}
        ></div>
      </div>
    </div>
  }
};

export default PageAxis;
