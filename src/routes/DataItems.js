import React from 'react';
import { connect } from 'dva';

function Component() {
  return (
    <div>
      Route Component
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Component);
