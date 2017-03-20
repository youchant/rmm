import React from 'react';
import {connect} from 'dva';
import {Table, Icon, Popconfirm, Button, Input, Pagination} from 'antd';
import {OperationTrigger} from '../Common/Operations';

function Component({
  dispatch, columns, data, loading, total, schema, modal, page,
  operations, singleOperations
}) {

  if(singleOperations){
    columns.push({
      title: '操作',
      key: 'action',
      width: 150,
      render: (text, record, index) => {
        return singleOperations(text, record, index);
      },
    })
  }

  return (
    <div>
      {modal && modal(data)}
      {
        operations ?
          <div className="table-operations">
            {operations(schema)}
          </div>
        : ''
      }
      <Table rowKey="id" dataSource={data} loading={loading} size="default"
             pagination={{total: total, showQuickJumper: true, page: page}}
             columns={columns}/>
    </div>

  );
}

export default connect()(Component)
