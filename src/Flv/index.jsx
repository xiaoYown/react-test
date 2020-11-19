import React, { createRef } from 'react'
import flvjs from 'flv.js'

class PageFlv extends React.Component {
  constructor(props) {
    super(props);
    this.video = createRef(null);
  }
  componentDidMount() {
    const videoElement = this.video.current;
    const flvPlayer = flvjs.createPlayer({
      type: 'flv',
      url: '/test.flv'
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
  }
  render() {
    return <div>
      <span>Flv 播发器</span>
      <div>
        <video controls ref={this.video}></video>
      </div>
    </div>
  }
};

export default PageFlv;
