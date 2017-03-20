import React from 'react';
import {connect} from 'dva';
import NormalList from '../Templates/NormalList';
import Editor from './Editor';
import mapping from '../../utils/mapping';
import {Edit, Delete, Add} from '../Common/Operations';
import * as handlers from '../../utils/handlers';

function UserList({dispatch, columns, data, loading, page, schema}) {

  return (
    <NormalList schema={schema} loading={loading}
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
                    </span>
                  )
                }}
                modal={()=> {
                  return <Editor />
                }}/>

  );
}

function mapStateToProps({app, loading, users}, props) {
  return {
    schema: users.schema,
    page: users.page,
    columns: mapping.getColumnsSchema(users.schema, [{
      key: 'name',
      render: text => <a href="#">{text}</a>
    }, 'nickname']),
    data: users.list,
    total: users.total,
    loading: loading.models.users,
  };
}

export default connect(mapStateToProps)(UserList)
