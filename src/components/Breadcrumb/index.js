import React , {useParams }from 'react';
import {withRouter}  from "../WithRouter.tsx"
import { Breadcrumb } from 'antd';
import Icon from '../Icon.tsx';
import sidebarMenu, {headerMenu} from '../../menu.js';  // 注意这种引用方式
import Logger from '../../utils/Logger';
import './index.scss';

const Item = Breadcrumb.Item;
const logger = Logger.getLogger('Breadcrumb');
/**
 * 定义面包屑导航, 由于和已有的组件重名, 所以改个类名
 */
class Bread extends React.PureComponent {
  componentWillMount() {
    // 准备初始化iconMap和nameMap
    const iconMap = new Map();
    const nameMap = new Map();
 
    // 这是个很有意思的函数, 本质是dfs, 但用js写出来就觉得很神奇
    const browseMenu = (item) => {
      nameMap.set(item.key, item.name);
      logger.debug('nameMap add entry: key=%s, value=%s', item.key, item.name);
      iconMap.set(item.key, item.icon);
      logger.debug('iconMap add entry: key=%s, value=%s', item.key, item.icon);

      if (item.child) {
        item.child.forEach(browseMenu);
      }
    };

    sidebarMenu.forEach(browseMenu);
    headerMenu.forEach(browseMenu);

    this.iconMap = iconMap;
    this.nameMap = nameMap;
  }

  render () {
    const itemArray = [];
    // 面包屑导航的最开始都是一个home图标, 并且这个图标是可以点击的
    itemArray.push(<Item key="systemHome" href="#"><Icon name="home"/> 首页</Item>);

    // this.props.routes是react-router传进来的
    const pathname = this.props.location.pathname;

    let pathStr = pathname.substring(pathname.lastIndexOf('/')+1)

    logger.debug('path=%s, route=%o',this.props.location, pathname);
    const name = this.nameMap.get(pathStr);

    if (name) {
      const icon = this.iconMap.get(pathStr);
      if (icon) {
        itemArray.push(<Item key={name}><Icon name={icon}/> {name}</Item>);  // 有图标的话带上图标
      } else {
        // 这个key属性不是antd需要的, 只是react要求同一个array中各个元素要是不同的, 否则有warning
        itemArray.push(<Item key={name}>{name}</Item>);
      }
    }
    // 这个面包屑是不可点击的(除了第一级的home图标), 只是给用户一个提示
    return (
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>{itemArray}</Breadcrumb>
      </div>
    );
  }

}

export default withRouter(Bread);
