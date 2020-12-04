import "./index.less";
import React from "react";
import ReactDOM from "react-dom";
import GetDerivedStateFromProps from './GetDerivedStateFromProps';

class PageTest extends React.Component {
  state = {
    title: "",
    value: 0
  };
  componentDidMount() {
    // Mutation Events
    document.addEventListener(
      "DOMSubtreeModified",
      function (e) {
        console.log("mutation events:");
        console.log(e);
      },
      false
    );
    // Mutation Observer
    new MutationObserver((records, itself) => {
      console.log("mutation observer:");
      console.log(records);
      console.log(itself);
    });
  }
  changeTitle(title) {
    document.querySelector("title").innerHTML = title;
    // this.setState({ title })
  }
  keydown = (e) => {
    console.log(e.key);
  };
  render() {
    const { title, value } = this.state;
    return ReactDOM.createPortal(
      <div>
        <h2>{title}</h2>
        <button onClick={() => this.changeTitle(1111)}>1111</button>
        <button onClick={() => this.changeTitle(2222)}>2222</button>
        <input type="text" onKeyDown={this.keydown} />
        {/* <div
          style={{
            position: "relative",
            width: "400px",
            height: "400px",
          }}
        >
          <span className="ouro ouro3">
            <span className="left">
              <span className="anim"></span>
            </span>
            <span className="right">
              <span className="anim"></span>
            </span>
          </span>
        </div> */}
        <br/>
        {/* <video
          width="300"
          controls="controls"
          src="https://www.banber.com/file_storage/5e81d41003f7bf000d930f20.mp4"
          type="video/mp4"
        ></video> */}
        <br/>
        <button onClick={() => this.setState({ value: value + 1 })}>plus</button>
        <GetDerivedStateFromProps value={value} />
      </div>,
      document.body
    );
  }
}

export default PageTest;
