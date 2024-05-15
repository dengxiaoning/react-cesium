import React, { Component } from "react";
import * as Cesium from "cesium/Cesium";
import { Draw } from "cesium_dev_kit";
import { Select } from "antd";
import "./css/draw.css";

const { Option } = Select;

let activeShapePoints = [];
let activeShape;
let floatingPoint;
//初始化绘制模式为线
let drawingMode = "line";

class DrawFeatureLayer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }
  // 添加地形数据
  addWorldTerrainAsync = async (viewer) => {
    try {
      const terrainProvider = await Cesium.CesiumTerrainProvider.fromIonAssetId(1);

      viewer.terrainProvider = terrainProvider;
    } catch (error) {
      console.log(`Failed to add world imagery: ${error}`);
    }
  };
  initViewer = () => {
    const drawObj = new Draw({
      cesiumGlobal: Cesium,
      containerId: "cesiumContainer",
      viewerConfig: {
        infoBox: false,
        shouldAnimate: true,
        geocoder: false,
        baseLayerPicker: false,
      },
      extraConfig: {
        depthTest: true,
        AccessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYzkwZWEwYy1mMmIwLTQwYjctOWJlOC00OWU4ZWU1YTZhOTkiLCJpZCI6MTIxODIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjA0OTUyNDN9.wagvw7GxUjxvHXO6m2jjX5Jh9lN0UyTJhNGEcSm2pgE",
      },
      MapImageryList: [
        {
          // 配置地形图片
          id: 16,
          name: "地形底图",
          type: "UrlTemplateImageryProvider",
          classConfig: {
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          },
          interfaceConfig: {
            subdomains: ["0", "1", "2", "3"],
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
          },
          offset: "0,0",
          invertswitch: 0,
          filterRGB: "#ffffff",
          showswitch: 1,
          weigh: 13,
          createtime: 1624346908,
          updatetime: 1647395260,
        },
      ],
    });

    this.addWorldTerrainAsync(drawObj.viewer);
    this.c_viewer = drawObj.viewer;
    this.draw = drawObj.draw;
    this.draw.setDefSceneConfig();
    this.draw.setBloomLightScene();
    this.flyTo();
    this.StraightArrowObj = drawObj.straightArrowObj;
    this.AttackArrowObj = drawObj.attackArrowObj;
    this.PincerArrowObj = drawObj.pincerArrowObj;
  };
  flyTo() {
    this.draw.setView({
      position: new Cesium.Cartesian3(-1337035.7496454942, 5285202.940044943, 3305373.990594733),
      orientation: {
        heading: 6.108097731064569,
        pitch: -0.15254104473396812,
        roll: 6.283157460498558,
      },
    });
  }

  drawShape() {
    if (drawingMode === "cylinder") {
      this.draw.drawCylinderGraphics({ topRadius: 1 });
    } else if (drawingMode === "line") {
      this.draw.drawLineGraphics();
    } else if (drawingMode === "polygon") {
      this.draw.drawPolygonGraphics({ height: 1800 });
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
    this.PincerArrowObj.disable();
    this.StraightArrowObj.disable();
    this.AttackArrowObj.disable();
    this.drawShape(activeShapePoints); //绘制最终图
  };

  handleChange = (value) => {
    //切换绘制模式
    drawingMode = value;
    //清理之前的状态
    this.stopShape();
  };

  componentDidMount() {
    this.initViewer();
    this.handleChange("cylinder");
  }

  componentWillUnmount() {
    if (this.viewer) {
      floatingPoint = undefined;
      activeShape = undefined;
      activeShapePoints = [];
      this.viewer.entities.removeAll();
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
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
