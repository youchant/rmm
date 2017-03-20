import React, { PropTypes } from 'react';
import {Form, Input} from 'antd';

import FormItem from '../Common/FormItem';
import valdateMessages from '../../utils/validateMessages';

class NormalForm extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    data: PropTypes.object,
    onOk: PropTypes.func,
    form: PropTypes.object,
    layout: PropTypes.string
  };
  static defaultProps = {
    layout: 'horizontal',
    items: [],
    data: {}
  };
  submitIt() {
    const onOk = this.props.onOk;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk && onOk(values);
      }
    })
  }
  render() {

    this.props.items.forEach(item => {
      Object.assign(item.attrs, {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
      })
    });

    return (
      <Form layout={this.props.layout} onSubmit={this.submitIt}>
        {
          this.props.items.map((item) =>
            <FormItem key={item.name} schema={item} form={this.props.form} />
          )
        }
        {this.props.children}
      </Form>
    )
  }
}

export default Form.create({
  validateMessages: valdateMessages,
  // 绑定字段的值
  mapPropsToFields(props){
    var ret = {};
    if(props.data){
      Object.entries(props.data).forEach(([key, item]) => {
        ret[key] = {
          value:item
        }
      });
    }
    return ret;
  }
})(NormalForm);
