import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Menu } from 'antd';
import Icon from '../Icon.tsx';
import Logo from '../Logo';
import Logger from '../../utils/Logger';
import items from '../../menu.js'; 
import globalConfig from '../../config.js';
import './index.scss';
import {sidebarCollapseCreator} from '../../redux/Sidebar.js';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const logger = Logger.getLogger('Sidebar');

/**
 * 定义sidebar组件
 */
class Sidebar extends React.PureComponent {

  state = {
    openKeys: [],  // 当前有哪些submenu被展开
  };


  /**
   * 将菜单项配置转换为对应的MenuItem组件
   *
   * @param obj sidebar菜单配置项
   * @param paths 父级目录, array
   * @returns {XML}
   */
  transFormMenuItem(obj, paths, isLevel1) {
    const parentPath = paths.join('/');   // 将各级父目录组合成完整的路径
    logger.debug('transform %o to path %s', obj, parentPath);

    return (
      <MenuItem key={obj.key} style={{ margin: '0px' }}>
        {obj.icon && <Icon name={obj.icon} style={{ color: '#fff' }} />}
        {/*对于level1的菜单项, 如果没有图标, 取第一个字用于折叠时显示*/}
        {isLevel1 && !obj.icon && <span className="invisible-nav-text">{obj.name[0]}</span>}
        <Link to={`/${parentPath}`} style={{ display: 'inline' }}><span className="nav-text">{obj.name}</span></Link>
      </MenuItem>
    );
  }

  componentWillMount() {
    const paths = [];  // 暂存各级路径, 当作stack用
    const level1KeySet = new Set();  // 暂存所有顶级菜单的key
    const level2KeyMap = new Map();  // 次级菜单与顶级菜单的对应关系

    // 菜单项是从配置中读取的, parse过程还是有点复杂的
    // map函数很好用
    const menu = items.map((level1) => {
      // parse一级菜单
      paths.push(level1.key);
      level1KeySet.add(level1.key);
      if (this.state.openKeys.length === 0) {
        this.state.openKeys.push(level1.key);  // 默认展开第一个菜单, 直接修改state, 没必要setState
      }

      // 是否有子菜单?
      if (level1.child) {
        const level2menu = level1.child.map((level2) => {
          // parse二级菜单
          paths.push(level2.key);
          level2KeyMap.set(level2.key, level1.key);

          if (level2.child) {
            const level3menu = level2.child.map((level3) => {
              // parse三级菜单, 不能再有子菜单了, 即使有也会忽略
              paths.push(level3.key);
              const tmp = this.transFormMenuItem(level3, paths);
              paths.pop();
              return tmp;
            });

            paths.pop();

            return (
              <SubMenu key={level2.key}
                       title={level2.icon ? <span><Icon name={level2.icon} />{level2.name}</span> : level2.name}>
                {level3menu}
              </SubMenu>
            );

          } else {
            const tmp = this.transFormMenuItem(level2, paths);
            paths.pop();
            return tmp;
          }
        });

        paths.pop();

        let level1Title;
        // 同样, 如果没有图标的话取第一个字
        if (level1.icon) {
          level1Title = <span><Icon name={level1.icon}/><span className="nav-text">{level1.name}</span></span>;
        } else {
          level1Title = <span><span className="invisible-nav-text">{level1.name[0]}</span><span
            className="nav-text">{level1.name}</span></span>;
        }

        return (
          <SubMenu key={level1.key} title={level1Title}>
            {level2menu}
          </SubMenu>
        )
      }
      // 没有子菜单, 直接转换为MenuItem
      else {
        const tmp = this.transFormMenuItem(level1, paths, true);
        paths.pop();  // return之前别忘了pop
        return tmp;
      }
    });

    this.menu = menu;
    this.level1KeySet = level1KeySet;
    this.level2KeyMap = level2KeyMap;
  }

  /**
   * 处理子菜单的展开事件
   *
   * @param openKeys
   */
  handleOpenChange = (openKeys) => {
    // 如果当前菜单是折叠状态, 就先展开
    if (this.props.collapse) {
      this.props.handleClickCollapse();
    }

    if (!globalConfig.sidebar.autoMenuSwitch) {  // 不开启这个功能
      this.setState({openKeys});
      return;
    }

    logger.debug('old open keys: %o', openKeys);
    const newOpenKeys = [];

    // 有没有更优雅的写法
    let lastKey = '';  // 找到最近被点击的一个顶级菜单, 跟数组中元素的顺序有关
    for (let i = openKeys.length; i >= 0; i--) {
      if (this.level1KeySet.has(openKeys[i])) {
        lastKey = openKeys[i];
        break;
      }
    }
    // 过滤掉不在lastKey下面的所有子菜单
    for (const key of openKeys) {
      const ancestor = this.level2KeyMap.get(key);
      if (ancestor === lastKey) {
        newOpenKeys.push(key);
      }
    }
    newOpenKeys.push(lastKey);

    logger.debug('new open keys: %o', newOpenKeys);
    this.setState({openKeys: newOpenKeys});
  };

  /**
   * 处理"叶子"节点的点击事件
   *
   * @param key
   */
  handleSelect = ({key}) => {
    if (this.props.collapse) {
      this.props.handleClickCollapse();
    }
    // 如果是level1级别的菜单触发了这个事件, 说明这个菜单没有子项, 需要把其他所有submenu折叠
    if (globalConfig.sidebar.autoMenuSwitch && this.level1KeySet.has(key) && this.state.openKeys.length > 0) {
      this.setState({openKeys: []});
    }
  };

  render() {
    return (
      <aside className={this.props.collapse ? "ant-layout-sidebar-collapse" : "ant-layout-sidebar"}>
        <Logo collapse={this.props.collapse}/>
        <Menu theme="dark" mode="inline"
              onOpenChange={this.handleOpenChange}
              onSelect={this.handleSelect}
              openKeys={this.props.collapse ? [] : this.state.openKeys}>
          {this.menu}
        </Menu>
        <div className="ant-layout-sidebar-trigger" onClick={this.props.handleClickCollapse}>
          <Icon name={this.props.collapse ? "right" : "left"}/>
        </div>
      </aside>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    collapse: state.Sidebar.collapse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 所有处理事件的方法都以handleXXX命名
    handleClickCollapse: bindActionCreators(sidebarCollapseCreator, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
