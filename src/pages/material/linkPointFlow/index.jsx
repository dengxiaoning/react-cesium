import React from "react";
import * as Cesium from "cesium/Cesium";
import { initCesium } from "cesium_dev_kit";
import './index.scss'

class FanShape extends React.PureComponent {
  initMap () {
    const { viewer, material, graphics,math3d} = new initCesium(
      {
        cesiumGlobal: Cesium,
        containerId: 'linkFlowCesiumContainer',
        viewerConfig: {
          infoBox: false,
          shouldAnimate: true,
        },
        extraConfig: {},
        MapImageryList: []
      })

    this.c_viewer = viewer

    this.material = material
    this.graphics = graphics
    this.math3d = math3d;
    this.material.setDefSceneConfig()
    this.material.setBloomLightScene()
    this.load3dTiles(viewer);

    this.createModel();
  }
  async load3dTiles(viewer) {
    const tilesetObj = await Cesium.Cesium3DTileset.fromUrl(
      "static/data/3DTiles/building/tileset.json"
    );

    var tilesets = viewer.scene.primitives.add(tilesetObj);
  
    tilesets.style = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [
          ['${height} >= 300', 'rgba(0, 149, 251, 0.3)'],
          ['${height} >= 200', 'rgb(0, 149, 251, 0.3)'],
          ['${height} >= 100', 'rgb(0, 149, 251, 0.3)'],
          ['${height} >= 50', 'rgb(0, 149, 251, 0.3)'],
          ['${height} >= 25', 'rgb(0, 149, 251, 0.3)'],
          ['${height} >= 10', 'rgb(0, 149, 251, 0.3)'],
          ['${height} >= 5', 'rgb(0, 149, 251, 0.3)'],
          ['true', 'rgb(0, 149, 251, 0.3)'],
        ],
      },
    })
    this.c_viewer.flyTo(tilesets);
  }
  getCustomMaterialLine (colors) {
    return new Cesium.Scene.PolylineFlowMaterialProperty({
      color: colors,
      duration: 200
    })
  }
  createModel () {
    const _self = this;
    var colors = [
      new Cesium.Color(77 / 255, 201 / 255, 255 / 255, 1),
      new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
      new Cesium.Color(221 / 255, 221 / 255, 221 / 255, 1)
    ];
    var startPoint = Cesium.Cartesian3.fromDegrees(104.081701757991, 30.627042558105988)

    for (var i = 0, len = 8; i < len; i++) {

      var endPoint = Cesium.Cartesian3.fromDegrees((Math.random() / 100) + 104.081701757991, (Math.random() / 100) + 30.627042558105988)

      var positions = this.math3d.getLinkedPointList(startPoint, endPoint, 100000, 50);

       this.c_viewer.entities.add({
        polyline: {
          positions: positions,
          width: 5,
          material: _self.getCustomMaterialLine(colors[i % 3]),
        }
      });
    }
  }
  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.c_viewer = null;
    this.control = null;
  }
  render() {
    return (
      <div className="linkFlow-box">
            <div id="linkFlowCesiumContainer"  className="map3d-contaner"></div>
    </div>
    )
  }
}

export default FanShape
