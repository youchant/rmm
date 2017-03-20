import modelFactory from '../utils/modelFactory'
import service from '../services/users'

const baseModel = modelFactory({
  namespace: 'users',
  service
});

export default {
  namespace: baseModel.namespace,
  state: {
    ...baseModel.state,
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
    },

  },
  reducers: {
    ...baseModel.reducers,
  },
  effects: {
    ...baseModel.effects,
  },
  subscriptions: {
    setup({dispatch, history}){
      return history.listen(({pathname, query}) => {
        if (pathname === '/system/users') {
          dispatch({type: 'fetch', payload: query})
        }
      })
    }
  },
}
