import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';

function getZoom (zoom, inc) {
  return Math.floor((zoom + inc) * 100) / 100;
}

class AxisScale extends React.Component {
  state = {}
  static getDerivedStateFromProps (props) {
    return {
      derivedPercent: Math.floor(props.zoom * 100)
    }
  }
  componentDidMount () {
    // window.addEventListener('mousewheel', e => e.preventDefault());
  }
  onHandle = (sign) => {
    if (!this.props.onChange) return;
    const { step, onChange } = this.props;
    let { zoom } = this.props;
    onChange(getZoom(zoom, sign * step))
  }
  render () {
    const { derivedPercent } = this.state;

    return ReactDOM.createPortal(
      <div className="xvd-free-axis-scale">
        <div
          className="xvd-free-axis-scale-opt"
          onClick={() => this.onHandle(-1)}
        >-</div>
        <div className="xvd-free-axis-scale-opt s-center">{ derivedPercent }%</div>
        <div
          className="xvd-free-axis-scale-opt"
          onClick={() => this.onHandle(1)}
        >+</div>
      </div>
    , document.body)
  }
}

export default AxisScale;
