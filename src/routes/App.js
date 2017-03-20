import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Layout, Spin} from 'antd'

import Login from '../components/App/Login'
import MainNav  from '../components/App/MainNav'
import TopNav from '../components/App/TopNav'
import MainBreadcrumb from '../components/App/MainBreadcrumb'

import styles from './App.less'

function Component({children, routes, dispatch, collapsed, loading, isLogin, appName, logoSrc}) {

  function toggleHandler(collapsed) {
    dispatch({
      type: 'app/toggleSider',
      payload: {
        collapsed: collapsed
      }
    })
  }

  return (
    <div>{
      isLogin ?
        <Layout style={{height: '100vh'}}>
          <Layout.Header>
            <div style={{float: 'left', lineHeight: '64px'}}>
              <img src={logoSrc} width="50px" style={{verticalAlign: 'middle'}}/>
              <span style={{verticalAlign: 'middle', color: '#999', fontSize: '16px', fontWeight: 'bold'}}>
                {appName}
              </span>
            </div>
            <TopNav />
          </Layout.Header>
          <Layout>
            <Layout.Sider style={{background: '#fff'}}
                          collapsible collapsed={collapsed} onCollapse={toggleHandler}>
              <MainNav routes={routes}/>
            </Layout.Sider>
            <Layout style={{padding: "16px"}}>
              <MainBreadcrumb routes={routes}/>
              <Layout.Content style={{background: '#fff', padding: '0 10px', position: 'relative'}}>
                {children}
              </Layout.Content>
            </Layout>

          </Layout>
        </Layout>
        :
        <div className={styles.login}>
          <Login />
        </div>
    }
    </div>
  );
}

function mapStateToProps({app, loading, personals}) {
  return {
    appName: app.name,
    logoSrc: app.logoSrc,
    isLogin: personals.isLogin,
    collapsed: app.sidebarCollapsed,
  };
}

export default connect(mapStateToProps)(Component)
