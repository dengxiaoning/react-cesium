import React, { PureComponent } from "react";
import * as Cesium from "cesium/Cesium";
import { Draw } from "cesium_dev_kit";
import { Select } from "antd";
import "./css/draw.css";

const { Option } = Select;

//初始化绘制模式为线
let drawingMode = "line";

class DrawFeatureLayer extends PureComponent {
  initViewer = () => {
    const drawObj = new Draw({
      cesiumGlobal: Cesium,
      containerId: "drawCesiumContainer",
      viewerConfig: {
        infoBox: false,
        shouldAnimate: true,
        geocoder: false,
        baseLayerPicker: false,
      },
      extraConfig: {
        depthTest: true,
      },
      MapImageryList: [],
    });

    this.c_viewer = drawObj.viewer;
    this.draw = drawObj.draw;
    // this.flyTo();
    this.StraightArrowObj = drawObj.straightArrowObj;
    this.AttackArrowObj = drawObj.attackArrowObj;
    this.PincerArrowObj = drawObj.pincerArrowObj;
   this.load3dTiles(drawObj.viewer);
  };
  flyTo() {
    this.draw.setView({
      position: new Cesium.Cartesian3(
        -1337035.7496454942,
        5285202.940044943,
        3305373.990594733
      ),
      orientation: {
        heading: 6.108097731064569,
        pitch: -0.15254104473396812,
        roll: 6.283157460498558,
      },
    });
  }
  async load3dTiles(viewer) {
    viewer.scene.sun.show = false;
    viewer.scene.moon.show = false;
    viewer.scene.skyAtmosphere.show = false;
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
  drawShape() {
    if (drawingMode === "cylinder") {
      this.draw.drawCylinderGraphics({ topRadius: 1 });
    } else if (drawingMode === "line") {
      this.draw.drawLineGraphics();
    } else if (drawingMode === "polygon") {
      this.draw.drawPolygonGraphics({ height: 200 });
    } else if (drawingMode === "circle") {
      this.draw.drawCircleGraphics();
    } else if (drawingMode === "rectangle") {
      this.draw.drawRectangleGraphics();
    } else if (drawingMode === "polylineVolume") {
      this.draw.drawPolylineVolumeGraphics({
        color: Cesium.Color.fromCssColorString("#FFD700"),
        shape: "fivePoint",
        arms: 5,
        rOuter: 25,
        rInner: 50,
      });
    }
  }

  stopShape = () => {
    this.destroyDraw(); // 清除操作
    this.drawShape(); //绘制最终图
  };

  destroyDraw() {
    this.PincerArrowObj.disable();
    this.StraightArrowObj.disable();
    this.AttackArrowObj.disable();
    this.draw.removeEventHandler();
  }

  handleChange = (value) => {
    //切换绘制模式
    drawingMode = value;
    //清理之前的状态
    this.stopShape();
  };

  componentDidMount() {
    this.initViewer();
    this.handleChange('cylinder')
  }

  componentWillUnmount() {
    if (this.viewer) {
      this.destroyDraw();
    }
  }

  render() {
    return (
      <div className="cesium-content-toolbar">
      <Select
         style={{ width: 200 }}
         defaultValue="cylinder"
         optionFilterProp="children"
         onChange={this.handleChange}
         filterOption={(input, option) =>
           option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
         }
       >
         <Option value="cylinder">Draw Cylinder</Option>
         <Option value="line">Draw Line</Option>
         <Option value="polygon">Draw Polygon</Option>
         <Option value="circle">Draw Circle</Option>
         <Option value="rectangle">Draw Rectangle</Option>
         <Option value="polylineVolume">Draw PolylineVolume</Option>
       </Select>
     </div>
    );
  }
}

export default DrawFeatureLayer;
