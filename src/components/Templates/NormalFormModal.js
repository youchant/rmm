import React from 'react';
import {Modal} from 'antd';
import {connect} from 'dva';
import NormalForm from './NormalForm';
import mapping from '../../utils/mapping';

function NormalFormModal({
  dispatch, editing, data, schema, width = '400px'
}) {

  const viewName = editing === 'new' ? 'add' : 'edit';
  const items = mapping.getFieldsSchema({schema, fields: schema.views[viewName]});
  const title = editing === 'new' ? `新增${schema.label}` : `编辑${schema.label}`;
  const okActionType = editing === 'new' ? `${schema.name}/create` : `${schema.name}/update`;

  let form = null;

  function closeModalHandler() {
    dispatch({
      type: `${schema.name}/save`,
      payload: {
        editing: null
      }
    })
  }

  function onFormOk(values) {
    dispatch({
      type: okActionType,
      payload: {
        id: editing === 'new' ? null : editing,
        values
      }
    });

    closeModalHandler();
  }

  function okHandler() {
    form.validateFields((err, values) => {
      if (!err) {
        onFormOk(values);
      }
    })
  }

  return (
    <Modal title={title}
           width={width}
           visible={editing !== null}
           onOk={okHandler}
           key={editing}
           onCancel={closeModalHandler}>
      <NormalForm items={items} ref={(inst) => {
        form = inst;
      }} data={data} onOk={onFormOk}/>
    </Modal>
  );
}

export default connect()(NormalFormModal)
