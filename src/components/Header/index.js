import React from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import Icon from '../Icon.tsx';
import Logger from '../../utils/Logger';
import globalConfig from '../../config';
import './index.scss';
import {headerMenu} from '../../menu';

const SubMenu = Menu.SubMenu;  // 为了使用方便
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

const logger = Logger.getLogger('Header');

/**
 * 定义Header组件, 包括登录/注销的链接, 以及一些自定义链接
 */
class Header extends React.PureComponent {

  // parse菜单的过程和sidebar组件差不多, copy&paste

  transFormMenuItem(obj, paths) {
    const parentPath = paths.join('/');
    logger.debug('transform %o to path %s', obj, parentPath);

    return (
      <MenuItem key={obj.key}>
        {obj.icon && <Icon name={obj.icon}/>}
        {obj.url ? <a target="_blank" rel="noreferrer" href={obj.url}>{obj.name}</a> :
          <Link to={`/${parentPath}`}>{obj.name}</Link>}
      </MenuItem>
    );
  }

  componentWillMount() {
    const paths = [];

    // 这一项菜单是必须有的, 不需要在配置文件里配置
    const logoutMenuItem = <MenuItem key="logout">
      <Icon name="icon-Logout"/>
      <a href={`${globalConfig.getAPIPath()}${globalConfig.login.logout}`}>注销</a>
    </MenuItem>;

    // header右侧必须是用户菜单
    let userMenuItems = null;

    const menu = headerMenu.map((level1) => {
      paths.push(level1.key);
      let transformedLevel1Menu;

      if (level1.child) {
        const level2menu = level1.child.map((level2) => {
          paths.push(level2.key);

          if (level2.child) {
            const level3menu = level2.child.map((level3) => {
              paths.push(level3.key);
              const tmp = this.transFormMenuItem(level3, paths);
              paths.pop();
              return tmp;
            });

            paths.pop();

            // 与sidebarMenu不同的是这里返回MenuItemGroup
            return (
              <MenuItemGroup key={level2.key}
                title={level2.icon ?
                  <span><Icon name={level2.icon} />{` ${level2.name}`}</span> : <span>{level2.name}</span>}>
                <Menu.Divider />
                {level3menu}
              </MenuItemGroup>
            );
          } else {
            const tmp = this.transFormMenuItem(level2, paths);
            paths.pop();
            return tmp;
          }
        });

        paths.pop();

        transformedLevel1Menu = (
          <SubMenu key={level1.key}
                   title={level1.icon ? <span><Icon name={level1.icon} />{level1.name}</span> : level1.name}>
            {level2menu}
          </SubMenu>
        );
      } else {
        transformedLevel1Menu = this.transFormMenuItem(level1, paths);
        paths.pop();
      }

      // 顶层菜单parse完毕后, 先不要直接返回, 如果用户在config中定义了用户菜单, 要单独处理
      if (level1.key === 'userMenu') {
        userMenuItems = transformedLevel1Menu.props.children;  // 注意这个直接读取props的逻辑
        return null;
      } else {
        return transformedLevel1Menu;
      }
    });

    this.menu = menu;

    // 注意用户菜单的最后一项必定是注销
    const userMenu = (
      <SubMenu title={<span><Icon name="icon-user" />{this.props.userName}</span>}>
        {userMenuItems && userMenuItems[0] ? userMenuItems : null}
        <Menu.Divider />
        {logoutMenuItem}
      </SubMenu>
    );

    this.userMenu = userMenu;
  }

  render() {
    return (
      <div className="ant-layout-header">
        {/*定义header中的菜单, 从右向左依次是注销/用户菜单/其他自定义菜单*/}
        <Menu className="header-menu" mode="horizontal">
          {this.userMenu}
          {this.menu}
        </Menu>
      </div>
    );
  }

}

export default Header;
