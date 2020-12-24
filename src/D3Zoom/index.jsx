import React, { createRef } from 'react'
import './index.less'
import { select } from 'd3-selection/dist/d3-selection'

class PageD3Zoom extends React.Component {
  constructor(props) {
    super(props);
    this.video = createRef(null);
  }
  componentDidMount() {
    const el = select('#d3-zoom')
    el.on('wheel.zoom', (event) => {
      console.log(event)
      event.preventDefault()
    }, {passive: false})
  }
  render() {
    return <div>
      <div id="d3-zoom"></div>
    </div>
  }
};

export default PageD3Zoom;
