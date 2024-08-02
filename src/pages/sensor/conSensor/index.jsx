import React from "react";
import * as Cesium from "cesium/Cesium";
import {   CustomCesiumPlugin} from 'cesium_dev_kit'
import './index.scss'

class Consensor extends React.PureComponent {
  state={
    currPosition: Cesium.Cartesian3.fromDegrees(117.224, 31.819, 128),
    roll: 0,
    pitch: 40,
    heading: 0,
    xHalfAngleDef: {
      max: 89,
      min: 1,
      value: 80 //初始值
    },
    yHalfAngleDef: {
      max: 2000000, min: 100000, value: 700000
    },

    HeadingDef: {
      max: 360, min: 0, value: 90 //初始值
    },
    PitchDef: {
      max: 360, min: 0, value: 0 //初始值
    },
    RollDef: {
      max: 360,
      min: 0,
      value: 0 //初始值
    }
  }
  initMap =() =>{
    const customCesiumPluginObj = new CustomCesiumPlugin({
      cesiumGlobal: Cesium,
      containerId: 'conSensorCesiumContainer',
      viewerConfig: {
        infoBox: false,
        shouldAnimate: true,
      },
      extraConfig: {},
      MapImageryList: [],
      defaultStatic: null
    })
    this.c_viewer = customCesiumPluginObj.viewer
    this.customCesiumPlugin = customCesiumPluginObj.customCesiumPlugin

    this.flyToPos()
    this.initPhaseControl()
  }
  flyToPos () {
    this.customCesiumPlugin.flyTo({
      position: {
        x: -1577100.7186109242,
        y: 5851821.270502206,
        z: 3447255.476239793
      },
      orientation: {
        heading: Cesium.Math.toRadians(78.17580384898336),
        pitch: Cesium.Math.toRadians(-29.981992162453782),
        roll: Cesium.Math.toRadians(0.005676460617140785)
      }
    })
  }
  initPhaseControl =()=> {

    const _this = this
    // let trackedEntityTest = this.graphics.createBoxGraphics({
    //   position: Cesium.Cartesian3.fromDegrees(117.224, 31.819, 128),
    //   name: "box",
    //   box: {
    //     dimensions: new Cesium.Cartesian3(500.0, 500.0, 500.0),//尺寸，长宽高
    //     material: new Cesium.ColorMaterialProperty((new Cesium.CallbackProperty(() => {
    //       return Cesium.Color.WHITE;
    //     }, false))),
    //   }
    // })

    this.sensorEntity = this.customCesiumPlugin.createRadarPrimitive(
      {
        position: _this.state.currPosition,
        heading: _this.state.heading,
        pitch: _this.state.pitch,
        roll: _this.state.roll
      }
    )
  }
  xHalfAngleChange (e) {
    this.sensorEntity.angle = e.target.value
  }
  yHalfAngleChange (e) {
    this.sensorEntity.radius = e.target.value
  }
  HeadingChange (e) {
    this.setState({heading: e.target.value});
    this.sensorEntity._rotation.heading = Cesium.Math.toRadians(
      this.state.heading
    )
  }
  PitchChange (e) {
    this.setState({pitch: e.target.value});
    this.sensorEntity._rotation.pitch = Cesium.Math.toRadians(this.state.pitch)
  }
  RollChange (e) {
    this.setState({roll: e.target.value});
    this.sensorEntity._rotation.roll = Cesium.Math.toRadians(this.state.roll)
  }
  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    // this.c_viewer = null
    // this.customCesiumPlugin = null
  }
  render() {
    return (
    <div className="phase-page">
    <div id="conSensorCesiumContainer"
         className="map3d-contaner"></div>
    <section className="elslider-control">
      <div className="slider-demo-block">
        <span className="demonstration">yHalfAngle:</span>
        <input type="range"
               value={this.state.yHalfAngleDef.value}
               max={this.state.yHalfAngleDef.max}
               min={this.state.yHalfAngleDef.min}
               onChange={this.yHalfAngleChange} />
      </div>
      <div className="slider-demo-block">
        <span className="demonstration">Heading:</span>
        <input type="range"
               value={this.state.HeadingDef.value}
               max={this.state.HeadingDef.max}
               min={this.state.HeadingDef.min}
               onChange={this.state.HeadingChange} />
      </div>
      <div className="slider-demo-block">
        <span className="demonstration">Pitch:</span>
              <input type="range"
                value={this.state.PitchDef.value}
                max={this.state.PitchDef.max}
                min={this.state.PitchDef.min}
                onChange={this.PitchChange } />
      </div>
      <div className="slider-demo-block">
        <span className="demonstration">Roll:</span>
        <input type="range"
              value={this.state.RollDef.value}
               max={this.state.RollDef.max}
               min={this.state.RollDef.min}
               onChange={this.RollChange} />
      </div>
    </section>
  </div>
    )
  }
}

export default Consensor
