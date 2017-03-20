import React from 'react';
import {Form, Modal, Input} from 'antd';
import {connect} from 'dva';
import NormalFormModal from '../Templates/NormalFormModal';

function Component({
  dispatch, visible, data, schema, editing
}) {
  return (
      <NormalFormModal schema={schema} editing={editing} data={data} />
  );
}

function mapStateToProps({app, loading, users}, props) {

  return {
    schema: users.schema,
    editing: users.editing,
    data: users.current,
    ...props,
  };
}

export default connect(mapStateToProps)(Component);
