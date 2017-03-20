import React from 'react';
import {connect} from 'dva'
import {Link} from 'dva/router'
import {Menu, Icon} from 'antd';

function MainNav({dispatch, routes, mode}) {
  const indexItem = routes[0];
  const items = routes[0].childRoutes;
  const openKeys = routes.map((route) => {
    return route.path
  }).filter(key => key != null);
  const selectedKeys = openKeys.slice(-1);

  function createChild(item, inRoot = false, prefix = '') {

    const textCls = inRoot ? 'nav-text' : '';
    const realPath = `${prefix}/${item.path}`.replace(/\/\//g, '/');

    if (item.navigable === false) {
      return null;
    }
    return (
      item.childRoutes ?
        <Menu.SubMenu key={item.path}
                      title={
                        <span>
                          {item.icon ? <Icon type={item.icon}/> : null}
                          <span className={textCls}>{item.label}</span>
                        </span>
                      }>
          {item.childRoutes.map((child) => createChild(child, false, realPath))}
        </Menu.SubMenu> :
        <Menu.Item key={item.path}>
          <Link to={realPath}>
            {item.icon ? <Icon type={item.icon}/> : null}
            <span className={textCls}>{item.label}</span>
          </Link>
        </Menu.Item>
    )
  }

  return (
    <Menu mode={mode}
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          style={{background: '#fff'}}>

      {createChild({
        icon: indexItem.icon,
        label: indexItem.label,
        path: indexItem.path
      }, true)}
      {items.map((item, i) => createChild(item, true))}
    </Menu>
  );
}

function mapStateToProps({app, loading, login}, props) {
  return {
    mode: app.sidebarCollapsed ? 'vertical' : 'inline'
  };
}

export default connect(mapStateToProps)(MainNav)
