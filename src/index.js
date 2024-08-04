import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Routes, Route,Navigate} from 'react-router-dom'
import { createHashHistory } from 'history';


import './utils/index.js';  // 引入各种prototype辅助方法
import store from './redux/store.js';  // redux store
import "cesium/Widgets/widgets.css";
import "antd/dist/reset.css";

// 开始引入各种自定义的组件
import App from './components/App';
import Error from './components/Error';
import DrawPlotObj from './pages/tools/draw/index.jsx'
import Analysis from './pages/tools/analysis/index.jsx'
import PostProcessStages from './pages/modelExample/postProcessStages'
import AniSoldier from './pages/modelExample/threeCesium/ani-soldier/index.jsx'
import RayCast from './pages/modelExample/threeCesium/rayCast/index.jsx'
import LinkPointFlow from './pages/material/linkPointFlow/index.jsx'
import FanShapeScan from './pages/fanShapeScan/index.jsx'


const hashHistory = createHashHistory();

const routes = (
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}
      location={hashHistory.location} navigator={hashHistory}>
      <Routes>
        <Route path="/" element={<App />}  >
          <Route index element={<Navigate to="/tools/draw" replace />} />
          <Route path="fanShapeScan" element={<FanShapeScan/>}/>
          <Route path="tools" >
            <Route index path="draw"  element={<DrawPlotObj />} />
            <Route index path="analysis"  element={<Analysis />} /> 
          </Route>
          <Route path="material" >
            <Route path="linkPointFlow"  element={<LinkPointFlow />} />
          </Route>
          <Route path="modelExample" >
            <Route path="postProcessStages" element={<PostProcessStages/>}/>
            <Route path="threeCesium" >
              <Route path="aniSoldier" element={<AniSoldier/>}/>
              <Route path="rayCast" element={<RayCast/>}/>
            </Route>
          </Route>
          <Route path="*" element={<Error/>}/>
       </Route>
      </Routes>
    </Router>
  </Provider>
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(routes);