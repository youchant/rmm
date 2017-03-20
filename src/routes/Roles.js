import React from 'react';
import { connect } from 'dva';
import List from '../components/Roles/List';

function Component() {
  return (
    <List />
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Component);
