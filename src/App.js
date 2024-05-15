import React, { Component } from "react";
import DrawPlot from "./component/draw/plot.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      render: true,
    };
  }
  render() {
    return (
      <div className="App">
        <div id="cesiumContainer" />
        <div className="cesium-content">
          <DrawPlot />
        </div>
      </div>
    );
  }
}
