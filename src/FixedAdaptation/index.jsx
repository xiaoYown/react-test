import './index.less'
import React from 'react'

// https://juejin.cn/post/6892775873464926222

function getScale (width) {
  const { availWidth } = window.screen;
  const scale = Math.floor((availWidth / width) * 10000) / 10000;
  return scale;
}
function setViewport (scale) {
  const meta = document.querySelector('meta[name="viewport"]');
  const content = `width=device-width, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=${scale}, user-scalable=no`;
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    let _meta = document.createElement('meta');
    _meta.setAttribute('content', content);
    document.head.appendChild(_meta);
  }
}

class PageFixedAdaptation extends React.Component {
  componentDidMount() {
    setViewport(getScale(750));
  }
  componentWillUnmount () {
  }
  render() {
    return <div className="page-fixed-adaptatio">
      <div className="page-fixed-adaptatio-1">
      </div>
      <div className="page-fixed-adaptatio-2">
      </div>
      <div className="page-fixed-adaptatio-3">
      </div>
    </div>
  }
};

export default PageFixedAdaptation;
