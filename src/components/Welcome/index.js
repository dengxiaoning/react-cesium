import React from 'react';
import './index.scss';

/**
 * 展示欢迎界面
 */
class Welcome extends React.PureComponent {

  render() {
    return (
      <div>
        <h1 className="welcome-text">
          Welcome, 这里是欢迎界面, 欢迎访问我的<a target="_blank" href="https://benpaodehenji.com/cesiumDevKit/">blog</a>.
          <br />
          项目地址: <a target="_blank" href="https://github.com/dengxiaoning/react-cesium">https://github.com/dengxiaoning/react-cesium</a>
        </h1>
      </div>
    );
  }

}

export default Welcome;
