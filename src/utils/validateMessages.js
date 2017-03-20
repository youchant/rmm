/**
 * 覆盖 async-validator 的默认英文消息
 *
 * @description
 *  因为它在处理message format 的时候使用 fullField，因此无法传入中文 label，否则找不到字段
 *  如果用它默认的 format 机制，如果没用参数，它会默认将没用的参数附加在 message 后，因此只有用方法进行覆盖
 */
export default {

  default: (...args) => '该项验证失败',
  required: (...args) => '该项是必填项',
  enum: '%s must be one of %s',
  whitespace: () =>'该项不能为空值',
  date: {
    format: '%s date %s is invalid for format %s',
    parse: '%s date could not be parsed, %s is invalid ',
    invalid: '%s date %s is invalid',
  },
  types: {
    string: '%s is not a %s',
    method: '%s is not a %s (function)',
    array: '%s is not an %s',
    object: '%s is not an %s',
    number: '%s is not a %s',
    date: '%s is not a %s',
    boolean: '%s is not a %s',
    integer: '%s is not an %s',
    float: '%s is not a %s',
    regexp: '%s is not a valid %s',
    email: '%s is not a valid %s',
    url: '%s is not a valid %s',
    hex: '%s is not a valid %s',
  },
  string: {
    len: (...args) =>`该项应为${args[1]}个字符长度`,
    min: (...args) => `该项应至少${args[1]}个字符长度`,
    max: (...args) => `该项不能多于${args[1]}个字符长度`,
    range:(...args) => `该项长度应该在${args[1]}到${args[2]}个字符之间`,
  },
  number: {
    len: (...args) =>`该项应等于${args[1]}`,
    min: (...args) =>`该项应小于${args[1]}`,
    max: (...args) =>`该项应大于${args[1]}`,
    range: (...args) =>`该项应在${args[1]}于${args[2]}之间`,
  },
  array: {
    len: '%s must be exactly %s in length',
    min: '%s cannot be less than %s in length',
    max: '%s cannot be greater than %s in length',
    range: '%s must be between %s and %s in length',
  },
  pattern: {
    mismatch: (...args) => `此项值${args[1]}与模式${args[2]}不匹配`,
  },
}
