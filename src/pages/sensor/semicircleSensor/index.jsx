import React from "react";
import * as Cesium from "cesium/Cesium";
import { CustomCesiumPlugin} from 'cesium_dev_kit'
import './index.scss'

class SemicircleSensor extends React.PureComponent {
  state={
    currPosition: Cesium.Cartesian3.fromDegrees(117.224, 31.819, 128),
    roll: 0,
    pitch: 0,
    heading: 90,
    xHalfAngleDef: {
      max: 90,
      min: 0,
      value: 55 //初始值
    },
    yHalfAngleDef: {
      max: 90,
      min: 0,
      value: 0 //初始值
    },

    HeadingDef: {
      max: 360,
      min: 0,
      value: 90 //初始值
    },
    PitchDef: {
      max: 360,
      min: 0,
      value: 0 //初始值
    },
    RollDef: {
      max: 360,
      min: 0,
      value: 0 //初始值
    }
  }
  initMap () {
    const customCesiumPluginObj = new CustomCesiumPlugin(
      {
        cesiumGlobal: Cesium,
        containerId: 'semicircleCesiumContainer',
        viewerConfig: {
          infoBox: false,
          shouldAnimate: true,
        },
        extraConfig: {},
        MapImageryList: []
      })

    this.c_viewer = customCesiumPluginObj.viewer
    this.customCesiumPlugin = customCesiumPluginObj.customCesiumPlugin

    this.flyToPos(this)
    this.initPhaseControl(this)
  }
  flyToPos (_this) {
    _this.customCesiumPlugin.flyTo({
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
  initPhaseControl (_this) {
    _this.sensorEntity = _this.customCesiumPlugin.createRectangularSensorGraphics(
      {
        position: _this.state.currPosition,
        xHalfAngle: 90,
        yHalfAngle: 90,
        heading: _this.state.heading,
        pitch: _this.state.pitch,
        roll: _this.state.roll,
        scanPlaneColor: new Cesium.Color(1.0, 1.0, 1.5, 1.0),
        material: new Cesium.Color(1.0, 1.0, 1.5, 0.4),
        lineColor: new Cesium.Color(1.0, 1.0, 1.5, 1.0)
      }
    )
  }
  xHalfAngleChange = (e) => {
    this.setState(
      () => ({
        xHalfAngleDef: {...this.state.xHalfAngleDef,value:e.target.value},
      }));
    this.sensorEntity.rectangularSensor.xHalfAngle = Cesium.Math.toRadians(
      e.target.value
    )
  }
  yHalfAngleChange = (e) => {
    
    this.setState(
      () => ({
        yHalfAngleDef: {...this.state.yHalfAngleDef,value:e.target.value},
      }));
    this.sensorEntity.rectangularSensor.yHalfAngle = Cesium.Math.toRadians(
      e.target.value
    )
  }
  HeadingChange =(e)=> {
    const _this = this
    this.setState(
      () => ({
        HeadingDef: { ...this.state.HeadingDef, value: e.target.value },
        heading:e.target.value
      }));
    _this.sensorEntity.orientation = Cesium.Transforms.headingPitchRollQuaternion(
      _this.state.currPosition,
      new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(_this.state.heading),
        Cesium.Math.toRadians(_this.state.pitch),
        Cesium.Math.toRadians(_this.state.roll)
      )
    )
  }
  PitchChange =(e)=> {
    const _this = this

    this.setState(
      () => ({
        PitchDef: { ...this.state.PitchDef, value: e.target.value },
        pitch:e.target.value
      }));
    _this.sensorEntity.orientation = Cesium.Transforms.headingPitchRollQuaternion(
      _this.state.currPosition,
      new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(_this.state.heading),
        Cesium.Math.toRadians(_this.state.pitch),
        Cesium.Math.toRadians(_this.state.roll)
      )
    )
  }
  RollChange =(e)=> {
    const _this = this

    this.setState(
      () => ({
        RollDef: { ...this.state.RollDef, value: e.target.value },
        roll:e.target.value
      }));
    this.sensorEntity.orientation = Cesium.Transforms.headingPitchRollQuaternion(
      _this.state.currPosition,
      new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(_this.state.heading),
        Cesium.Math.toRadians(_this.state.pitch),
        Cesium.Math.toRadians(_this.state.roll)
      )
    )
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
<div className="semicircle-page">
    <div id="semicircleCesiumContainer"
         className="map3d-contaner"></div>
    <section className="elslider-control">
      <div className="slider-demo-block">
        <span className="demonstration">xHalfAngle:</span>
        <input type="range"
              value={this.state.xHalfAngleDef.value}
               max={this.state.xHalfAngleDef.max}
               min={this.state.xHalfAngleDef.min}
               onChange={this.xHalfAngleChange}/>
      </div>
      <div className="slider-demo-block">
        <span className="demonstration">yHalfAngle:</span>
        <input type="range"
              value={this.state.yHalfAngleDef.value}
               max={this.state.yHalfAngleDef.max}
               min={this.state.yHalfAngleDef.min}
               onChange={this.yHalfAngleChange}/>
      </div>
      <div className="slider-demo-block">
        <span className="demonstration">Heading:</span>
            <input type="range"
              value={this.state.HeadingDef.value}
              max={this.state.HeadingDef.max}
              min={this.state.HeadingDef.min}
              onChange={this.HeadingChange } />
      </div>
      <div className="slider-demo-block">
        <span className="demonstration">Pitch:</span>
            <input type="range"
            value={this.state.PitchDef.value}
              max={this.state.PitchDef.max}
              min={this.state.PitchDef.min}
              onChange={this.PitchChange} />
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

export default SemicircleSensor
