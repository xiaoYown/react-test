import React, { createRef } from 'react'
import './index.less'
import { select } from 'd3-selection/dist/d3-selection'

let last = null;

class PageD3Zoom extends React.Component {
  constructor(props) {
    super(props);
    this.video = createRef(null);
  }
  componentDidMount() {
    const el = select('#d3-zoom')
    el.on('wheel.zoom', (event) => {
      // console.log(event)
      let diff = {}
      if (last) {
        for (let key in event) {
          if (event[key] === last[key]) continue;
          diff[key] = {
            old: last[key],
            new: event[key]
          }
        }
      }
      last = event
      // console.log(event.wheelDelta)
      // console.log(event.wheelDeltaY)
      // console.log(diff)
      if (event.ctrlKey) {
        event.preventDefault()
      }
    }, {passive: false})
  }
  render() {
    return <div>
      <div id="d3-zoom"></div>
    </div>
  }
};

export default PageD3Zoom;
