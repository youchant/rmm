import React from 'react';
import {Layout, Pagination} from 'antd'
import {connect} from 'dva';
import List from '../components/Users/List';
import styles from './Users.css';

function Users() {
  return (
    <List />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Users);
