import React from 'react';
import {Menu, Dropdown, Icon } from 'antd';
import {connect} from 'dva';
import NormalList from '../Templates/NormalList';
import Editor from './Editor';
import mapping from '../../utils/mapping';
import {Edit, Delete, Add, OperationTrigger} from '../Common/Operations';
import * as handlers from '../../utils/handlers';

function Component({dispatch, columns, data, loading, page, schema}) {

  return (
    <NormalList dispatch={dispatch} schema={schema} loading={loading}
                columns={columns} data={data} page={page}
                operations={(schema) => {
                  return Add({type: 'primary', handler: handlers.beginEditHandler.bind(null, dispatch, schema.name, null)})
                }}

                singleOperations={(text, record, index) => {
                  return (
                    <span>
                      {Edit({handler: handlers.beginEditHandler.bind(null, dispatch, schema.name, record.id)})}
                      <span className="ant-divider"/>
                      {Delete({handler: handlers.deleteHandler.bind(null, dispatch, schema.name, record.id) }) }
                      <span className="ant-divider"/>
                      {OperationTrigger({ type: 'link', label: '权限设置'})}
                    </span>
                  )
                }}
                editModal={()=> {
                  return <Editor />
                }}/>
  );
}

function mapStateToProps({app, loading, roles}, props) {
  return {
    schema: roles.schema,
    page: roles.page,
    columns: mapping.getColumnsSchema(roles.schema, ['name', 'note']),
    data: roles.list,
    total: roles.total,
    loading: loading.models.roles,
  };
}

export default connect(mapStateToProps)(Component)
