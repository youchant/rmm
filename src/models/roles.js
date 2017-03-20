import modelFactory from '../utils/modelFactory'
import service from '../services/roles'

const baseModel = modelFactory({
  namespace: 'roles',
  service
});

export default {
  namespace: baseModel.namespace,
  state: {
    ...baseModel.state,
    schema: {
      name: baseModel.namespace,
      label: '角色',
      fields: {
        'name': {
          type: 'string',
          label: '角色名',
          meta: {
            rules: [{
              required: true
            }]
          }
        },
        'note': {
          type: 'string',
          label: '备注'
        }
      },
      views: {
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
        if (pathname === '/system/roles') {
          dispatch({type: 'fetch', payload: query})
        }
      })
    }
  },
}
