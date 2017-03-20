import React from 'react';
import {connect} from 'dva'
import { Menu, Icon } from 'antd';

function Component({dispatch, name}) {

  function clickHandler(e){
    if(e.key === 'logout'){
      dispatch({
        type: 'personals/logout'
      })
    }
  }

  const style = {
    float: 'right'
  }

  return (
    <Menu mode="horizontal" theme="dark" style={{lineHeight: '64px'}} className="top-menu" onClick={clickHandler}>
      <Menu.SubMenu title={
        <span>
          <Icon type='user' />
          {name}
        </span>
      }>
        <Menu.Item key='changePassword'>
          <a>
            <Icon type="key" />
            修改密码
          </a>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a>
            <Icon type="poweroff" />
            注销
          </a>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}

function mapStateToProps({app, loading, personals}) {
  return {
    name: personals.nickname
  };
}

export default connect(mapStateToProps)(Component)
