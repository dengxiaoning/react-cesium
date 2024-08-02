import React from "react";
import {Card,Button } from 'antd'
import * as Cesium from "cesium/Cesium";
import { initCesium} from 'cesium_dev_kit'
import './index.scss'

class Analysis extends React.PureComponent {
      // 添加地形数据
      async addWorldTerrainAsync (viewer) {
        try {
          const terrainProvider = await Cesium.CesiumTerrainProvider.fromIonAssetId(1);
          viewer.terrainProvider = terrainProvider;
        } catch (error) {
          console.log(`Failed to add world imagery: ${error}`);
        }
      }
  initMap () {
    const {
      viewer,
      analysis
    } = new initCesium(
      {
        cesiumGlobal: Cesium,
        containerId: 'analysisCesiumContainer',
        viewerConfig: {
          infoBox: false,
          shouldAnimate: true,
        },
        extraConfig: {
          depthTest: true, // 深度测试
        },
        MapImageryList: [
          {
            type: 'UrlTemplateImageryProvider',
            option: {
              url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
              subdomains: ['0', '1', '2', '3'],
              tilingScheme: new Cesium.WebMercatorTilingScheme()
            }
          }]
      })

    this.c_viewer = viewer;
    this.analysis = analysis;
    this.addWorldTerrainAsync(viewer);
    this.flyTo(analysis);
  }
  flyTo (analysis) {
    analysis.setView({
      position: new Cesium.Cartesian3(-1337035.7496454942, 5285202.940044943, 3305373.990594733),
      orientation: {
        heading: 6.108097731064569,
        pitch: -0.15254104473396812,
        roll: 6.283157460498558

      },
    })
  }
  VisibilityAnalysis =()=> {this.analysis.createVisibilityAnalysis();}
  lookAroundAnalysis =()=> { this.analysis.createLookAroundAnalysis(); }
  visualFieldAnalysis =()=> { this.analysis.createVisualFieldAnalysis(); }
  clipPlanAnalysis =()=> { this.analysis.createClipPlanAnalysis(); }
  submergedAnalysis =()=> { this.analysis.createSubmergedAnalysis(); }
  slopeAnalysis =()=> { this.analysis.createSlopeAnalysis(); }
  cutVolumeAnalysis =()=> { this.analysis.createCutVolumeAnalysis(); }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.c_viewer = null;
    this.material = null;
    this.graphics = null;
  }
  render() {
    return (
      <div className="analysis-plane">
          <div id="analysisCesiumContainer"
              className="map3d-contaner"></div>
          <Card className="box-card" title="分析面板">
            <div className="group-btn">
            <Button type="dashed" onClick={this.VisibilityAnalysis}>
            通视分析
          </Button>
          <Button type="dashed" onClick={this.lookAroundAnalysis}>
          环视分析
          </Button>
          <Button type="dashed" onClick={this.visualFieldAnalysis}>
          可视域分析
          </Button>
          <Button type="dashed" onClick={this.clipPlanAnalysis}>
          地形开挖分析
          </Button>
          <Button type="dashed" onClick={this.submergedAnalysis}>
          淹没分析
          </Button>
             
          <Button type="dashed" onClick={this.slopeAnalysis}>
          坡度分析
          </Button>
          <Button type="dashed" onClick={this.cutVolumeAnalysis}>
          方量分析
          </Button>
            </div>
          </Card>
  </div>)
  }
}

export default Analysis
