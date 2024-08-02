import React from "react";
import * as Cesium from "cesium/Cesium";
import { initCesium } from "cesium_dev_kit";
import './index.scss'

class FanShape extends React.PureComponent {
  initMap () {
    const { viewer, material, graphics } = new initCesium(
      {
        cesiumGlobal: Cesium,
        containerId: 'fanshapeCesiumContainer',
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
    this.material.setDefSceneConfig()
    this.material.setBloomLightScene()
    this.load3dTiles(viewer);

    this.createAEllipsoid();
    this.createAFanShape();
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
  createCustMaterialWall (imgUrl, colorVal, durationNum, countNum, directionStr) {
    return this.material.getCustomMaterialWall({
      image: imgUrl,
      freely: 'cross',
      direction: directionStr || '+',
      count: countNum,
      color: colorVal,
      duration: durationNum
    })
  }
  // 创建椭圆体
  createAEllipsoid () {
    var position = Cesium.Cartesian3.fromDegrees(
      104.06417395476578,
      30.636185094244944
    )
    var ellipsoid = this.graphics.getEllipsoidGraphics({
      radii: 700,
      material: Cesium.Color.AQUAMARINE.withAlpha(0.3),
      outline: true,
      outlineColor: Cesium.Color.AQUAMARINE.withAlpha(0.5),
    })
    this.c_viewer.entities.add({
      name: 'oneEllipsoid',
      position: position,
      ellipsoid: ellipsoid
    });

  }
  // 创建一个扫描扇形
  createAFanShape () {
    /**
      * @param {Object} viewer cesium 视图对象
      * @param {Material} custMaterial 自定义材质
      * @param {Number} speed 运动速度(为0停止扫描)
      * @param {Number} longitude 纬度
      * @param {Number} latitude 经度
      * @param {Number} alt 高度(z轴)
      * @param {String} direction 扫描方向（"-"顺时针，"+"逆时针）
     */
    this.graphics.createFanShape({
      viewer: this.c_viewer,
      longitude: 104.06417395476578,
      latitude: 30.636185094244944,
      alt: 700,
      speed: 2.0,
      direction: '+',
      // custMaterial: Cesium.Color.AQUAMARINE.withAlpha(0.5)
      custMaterial: this.createCustMaterialWall(
        'static/data/images/Textures/b2.png',
        Cesium.Color.GOLD,
        2000,
        1.0,
        '+'
      )
    })
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
      <div className="fanshape-box">
            <div id="fanshapeCesiumContainer"  className="map3d-contaner"></div>
    </div>
    )
  }
}

export default FanShape
