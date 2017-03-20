
function fieldToColumn(key, field, extra){
  const ret = {
    title: field.label,
    dataIndex: key,
    key: key
  };
  if(extra && typeof extra === 'object'){
    return Object.assign(ret, extra);
  }
  return ret;
}

function fieldToFormItem(key, field, extra){
  const ret = {
    name: key,
    type: field.type,
    label: field.label,
    uihint: field.uihint || field.type,
    rules: field.rules,
    meta: {},
    attrs: {},
    inputAttrs: {}
  };
  if(extra && typeof extra === 'object'){
    return Object.assign(ret, extra);
  }
  return ret;
}

function pickExtra(fields, key){
  return fields && fields.find(item =>
      typeof item === 'string' ? item === key: item.key === key);
}

export default {
  /**
   * 从架构映射到 antd Table 列配置
   * @param schema
   * @param fields
   * @returns {Array}
   */
  getColumnsSchema(schema, fields){
    const ret = [];

    Object.entries(schema.fields).forEach(([key,field])=> {
      const extra = pickExtra(fields, key);
      if(!fields || extra){
        ret.push(fieldToColumn(key, field, extra));
      }
    });
    return ret;
  },
  /**
   * 从架构映射到 FormItem 配置
   * @param schema - 架构对象
   * @param fields - 需要映射的字段
   * @param isDic - 返回结果是否是字典
   * @returns {*}
   */
  getFieldsSchema({
    schema,
    fields = null,
    isDic = false
  }){
    const items = [];
    Object.entries(schema.fields).forEach(([key, item]) => {
      const extra = pickExtra(fields, key);
      if(!fields || extra){
        items.push(fieldToFormItem(key, item, extra));
      }
    });

    if(isDic){
      let ret = {};
      items.forEach(item => {
        ret[item.name] = item;
      });
      return ret;
    }

    return items;
  }
}
