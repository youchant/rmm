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

function mapStateToProps({app, loading, roles}, props) {

  return {
    schema: roles.schema,
    editing: roles.editing,
    data: roles.current,
    ...props,
  };
}

export default connect(mapStateToProps)(Component);
