import './index.less';
import React, { createRef } from 'react';
import zoomListener from './zoomListener';

class PageAxis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomBox: createRef()
    }
  }
  static getDerivedStateFromProps (props) {
    const { width, height, zoom } = props;
    return {
      containerStyle: {
        width: width * zoom + 'px',
      },
      canvasStyle: {
        width: width * zoom + 'px',
        height: height * zoom + 'px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }
    };
  }
  componentDidMount() {
    const { zoomBox } = this.state;
    console.log(zoomBox.current)
    this.zoomListener = zoomListener({
      ele: zoomBox.current,
      scale: res => console.log(res)
    })
  }
  componentWillUnmount () {
    this.zoomListener.destroy();
  }
  render() {
    const {
      zoomBox,
      canvasStyle,
      containerStyle
    } = this.state;

    return <div
      ref={zoomBox}
      className="xvd-free-axis-board"
    >
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
