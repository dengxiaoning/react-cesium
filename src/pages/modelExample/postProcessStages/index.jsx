import React from "react";
import * as Cesium from "cesium/Cesium";
import { initCesium } from "cesium_dev_kit";
import './index.scss'
class PostProcess extends React.PureComponent {
 async  initMap () {
    const tempData = [
      {
        type: 'UrlTemplateImageryProvider',
        option: {
          url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
        }
      },
      {
        type: 'UrlTemplateImageryProvider',
        option: {
          url: 'https://webst03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=7',
        }
      }
    ]
    const {
      viewer,
      control,
    } = new initCesium(
      {
        cesiumGlobal: Cesium,
        containerId: 'postCesiumContainer',
        viewerConfig: {
          infoBox: false,
          shouldAnimate: true,
        },
        extraConfig: {},
        MapImageryList: tempData
      })


    this.c_viewer = viewer;

    this.control = control;
    this.control.setDefSceneConfig()
    this.control.setBloomLightScene()

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
    this.control.showPostProcessStagesPanel({ elementId: 'cust-gui-box' });
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
      <div className="sky-box">
      <div id="postCesiumContainer"   className="map3d-contaner"/>
      <div className="cust-gui-box"  id="cust-gui-box"></div>
    </div>
    )
  }
}

export default PostProcess
