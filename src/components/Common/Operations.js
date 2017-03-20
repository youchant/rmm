import { Button, Icon, Popconfirm } from 'antd';

export function OperationTrigger({type = 'default', icon = null, label, handler = null}) {
  if (type === 'link') {
    return (<a onClick={handler}>
      { icon ? <Icon type={icon}/> : '' }
      {label}
    </a>);
  } else {
    return (<Button type={type} onClick={handler}>
      { icon ? <Icon type={icon}/> : '' }
      {label}
    </Button>);
  }

}

export function Add({type = 'default', label, handler}) {
  return (
    OperationTrigger({type, label: '新增', handler, icon: 'plus'})
  );
}

export function Delete({handler}) {
  return (
    <Popconfirm title="确认删除?" onConfirm={handler}>
      {OperationTrigger({type: 'link', label: '删除'})}
    </Popconfirm>
  );
}

export function Edit({handler}) {
  return (
    OperationTrigger({type: 'link', label: '编辑', handler})
  );
}
