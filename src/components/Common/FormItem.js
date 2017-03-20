/**
 * 表单项组件
 *
 * @example
 *  <FormItem schema={{ name: 'username', type: 'string', label: '用户名', meta: { rules: { required: true } } }} />
 */
import React from 'react';
import {Form, Input, Checkbox, InputNumber} from 'antd';

function Component({
  schema,
  form: {
    getFieldDecorator
  }
}) {

  schema.meta.rules = schema.rules;

  if(typeof schema.attrs === 'function'){
    schema.attrs = schema.attrs(schema);
  }
  if(schema.attrs.label == null){
    schema.attrs.label = schema.label;
  }

  if(typeof schema.inputAttrs === 'function'){
    schema.inputAttrs = schema.inputAttrs(schema);
  }

  function getInput(schema) {

    const uihint = schema.uihint || schema.type;

    switch (uihint) {
      case 'boolean':
      case 'checkbox':
        return <Checkbox {...schema.inputAttrs} />;
      case 'number':
        return <InputNumber {...schema.inputAttrs} />;
      case 'autocomplete':
        return <AutoComplete {...schema.inputAttrs} />;
      case 'password':
        return <Input type="password" {...schema.inputAttrs}/>;
      case 'string':
      default:
        return <Input {...schema.inputAttrs} />;
    }
  }

  return (
    <Form.Item hasFeedback {...schema.attrs}>
      {
        getFieldDecorator(schema.name, schema.meta)(getInput(schema))
      }
    </Form.Item>
  );
}

export default Component;
