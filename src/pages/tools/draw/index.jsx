import React from "react";
import DrawPlot from "./plot.jsx";

class PlotApp extends React.Component {
  render() {
    return (
      <div className="containerBox">
      <div id="drawCesiumContainer" className="drawCesiumContainer"/>
      <div className="cesium-content">
          <DrawPlot />
      </div>
    </div>
    )
  }
}

export default PlotApp
