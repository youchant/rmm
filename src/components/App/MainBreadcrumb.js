import React from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Icon, Breadcrumb} from 'antd';

function Component({routes}) {

  return (
    <Breadcrumb style={{marginBottom: '12px'}}>
      {
        routes.map((item, i) => {
          if(!item.path) return null;
          const path = routes.slice(0, i + 1).map(route => route.path).join('/').replace(/\/\//g, '/');
          return <Breadcrumb.Item key={path}>
            {
              (item.component) ?
                <Link to={path}>
                  { item.icon ? <Icon type={item.icon}/> : null }
                  {item.label}
                </Link> :
                <span>
                  { item.icon ? <Icon type={item.icon}/> : null }
                  {item.label}
                </span>
            }
          </Breadcrumb.Item>
        })
      }
    </Breadcrumb>
  );
}

export default connect()(Component)

