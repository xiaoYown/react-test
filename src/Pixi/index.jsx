import "./index.less";
import React from "react";
import * as PIXI from "pixi.js";

class PagePixi extends React.Component {
  state = {
    loaded: false,
    containerId: `catch-zongzi-${Date.now()}`,
  };
  container = () => {
    const { containerId } = this.state;
    return document.getElementById(containerId);
  };
  componentDidMount() {
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    const app = new PIXI.Application({
      width: 375,
      height: 800,
      // antialias: true,
      autoDensity: true,
      // backgroundColor: 0x1099bb,
      resolution: devicePixelRatio,
    });

    // The application will create a canvas element for you that you
    // can then insert into the DOM
    this.container().appendChild(app.view);

    // load the texture we need
    app.loader.add("bunny", "bunny.png").load((loader, resources) => {
      // This creates a texture from a 'bunny.png' image
      const bunny = new PIXI.Sprite(resources.bunny.texture);

      // Setup the position of the bunny
      bunny.x = app.renderer.width / 2;
      bunny.y = app.renderer.height / 2;

      // Rotate around the center
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // Add the bunny to the scene we are building
      app.stage.addChild(bunny);

      // Listen for frame updates
      app.ticker.add(() => {
        // each frame we spin the bunny around a bit
        // bunny.rotation += 0.01;
      });
    });
  }
  render() {
    const { containerId } = this.state;
    return <div id={containerId}></div>;
  }
}

export default PagePixi;
