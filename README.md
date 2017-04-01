# rmm

一个管理/后台系统模板，使用：

* [react](https://facebook.github.io/react/)
* [ant-design](https://ant.design/)
* [dva](https://github.com/dvajs/dva)
* [roadhog](https://github.com/sorrycc/roadhog)

## 使用

```
npm install
npm run start

npm run build
```

## 特性

有些简单的封装

### serviceFactory

使用 serviceFactory 简化 service 的创建

```javascript
export default serviceFactory({
  query: 'post /api/roles',
  read: 'get /api/roles/:id',
  create: 'post /api/roles',
  update: 'put /api/roles/:id',
  remove: 'delete /api/roles/:id'
})
```

### modelFactory

使用 modelFactory 简化 model 的创建

```javascript
const baseModel = modelFactory({
  namespace: 'users',
  service
});
```

### schema mapping

自定义 schema 使界面可配置化

```jsx
<NormalFormModal schema={schema} editing={editing} data={data} />
```

```js
schema: {
  name: 'users',
  label: '用户',
  fields: {
    'name': {
      type: 'string',
      label: '用户名',
      rules: [{
        required: true,
        len: 5
      }]
    },
    'nickname': {
      type: 'string',
      label: '昵称'
    },
    'password': {
      type: 'string',
      label: '密码',
      uihint: 'password'
    }
  },
  views: {
    add: ['name', 'nickname', 'password'],
    edit: ['nickname']
  }
}
```

另外，还有：

* 导航通过 Router 元数据生成
* 全局的 async-validator 验证信息替换
* 以及可能的一些公共的 dispatch



## 截图

![screenshot](docs/screenshots/login.png)

![screenshot](docs/screenshots/users.png)



