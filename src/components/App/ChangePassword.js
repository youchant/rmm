import React from 'react';
import {Button, Row, Form, Icon, Card} from 'antd'
import {connect} from 'dva';
import FormItem from '../Common/FormItem';
import styles from './Login.less';
import mapping from '../../utils/mapping';

function Component({
  dispatch, logoSrc, appName, loading, schema, form
}) {

  const items = mapping.getFieldsSchema({
    schema,
    fields: [{
      key: 'name',
      attrs: {
        label: false,
      },
      inputAttrs: (item) => ({
        size: 'large',
        placeholder: item.label,
        prefix: <Icon type="user" style={{fontSize: 13}}/>
      })
    }, {
      key: 'password',
      attrs: {
        label: false
      },
      inputAttrs: (item) => ({
        size: 'large',
        placeholder: item.label,
        prefix: <Icon type="lock" style={{fontSize: 13}}/>
      })
    }]
  });

  function loginHandler(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: values
        })
      }
    })
  }

  return (
    <Card bordered={false} style={{boxShadow: '0 1px 6px rgba(0,0,0,.2)'}}
          bodyStyle={{padding: '24px 24px 45px'}} className={styles.form}>
      <div className={styles.logo}>
        <img src={logoSrc}/>
        <span>{appName}</span>
      </div>
      <Form onSubmit={loginHandler}>
        {items.map(item => <FormItem key={item.name} form={form} schema={item}/>)}
        <Row>
          <Button type='primary' htmlType="submit" size='large' loading={loading}>
            登录
          </Button>
        </Row>
      </Form>
    </Card>
  );
}

function mapStateToProps({app, loading, login}) {
  return {
    logoSrc: app.logoSrc,
    appName: app.name,
    schema: login.schema,
    loading: loading.models.login
  };
}

const WrappedComponent = Form.create()(Component)

export default connect(mapStateToProps)(WrappedComponent);
