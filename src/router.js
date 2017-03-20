import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './routes/App';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      label: '主页',
      icon: 'home',
      component: App,
      indexRoute: {
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/Dashboard'));
          });
        },
      },
      childRoutes: [{
        path: 'system',
        icon: 'safety',
        label: '系统管理',
        childRoutes: [{
          path: 'users',
          label: '用户',
          icon: 'user',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/users'));
              cb(null, require('./routes/Users'));
            });
          }
        },{
          path: 'roles',
          label: '角色',
          icon: 'team',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/roles'));
              cb(null, require('./routes/Roles'));
            });
          }
        },{
          path: 'permissions',
          label: '权限',
          icon: 'lock',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
             // registerModel(app, require('./models/permissions'));
              cb(null, require('./routes/Permissions'));
            });
          }
        }]
      },{
        path: 'config',
        icon: 'setting',
        label: '配置管理',
        childRoutes: [{
          path: 'data-items',
          label: '数据项',
          icon: 'database',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
             // registerModel(app, require('./models/dataitems'));
              cb(null, require('./routes/DataItems'));
            });
          }
        }]
      },{
        path: '*',
        navigable: false,
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/Error'));
          });
        }
      }]
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
