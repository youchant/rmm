import * as service from '../services/personals'

const ANON = 'anonymous'

export default {
  namespace: 'personals',
  state: {
    schema: {
      name: 'personals',
      label: '登录',
      fields: {
        'name': {
          type: 'string',
          label: '用户名',
          rules: [
            {
              required: true,
              message: '请填写用户名'
            }
          ]
        },
        'password': {
          type: 'string',
          label: '密码',
          rules: [
            {
              required: true,
              message: '请填写密码'
            }
          ]
        }
      },
      views: {

      }
    },
    isLogin: false,
    name: ANON,
    nickname: null
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *login ({payload}, {put, call}){
      const {data} = yield call(service.login, payload)

      yield put({
        type: 'save',
        payload: {
          isLogin: true,
          name: payload.loginName
        }
      })
    },
    *current ({payload}, {put, call}){
      const {data} = yield call(service.current, payload)
      yield put({
        type: 'save',
        payload: {
          isLogin: true,
          name: data.name,
          nickname: data.nickname
        }
      })
    },
    *logout ({type, payload}, {put, call, select}){
      const {data} = yield call(service.logout)

      yield put({
        type: 'save',
        payload: {
          isLogin: false,
          name: ANON
        }
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
};
