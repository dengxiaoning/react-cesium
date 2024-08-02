import React from 'react';
import Icon from '../Icon.tsx';
import './index.scss';

/**
 * 显示错误信息
 * 可以当404页来用
 */
class Error extends React.PureComponent {

  render() {
    return (
      <div className="not-found">
        <div style={{ fontSize:32 }}><Icon type="icon-a-404"/></div>
        <h1>{this.props.errorMsg || '404 Not Found'}</h1>
      </div>
    );
  }

}

export default Error;
