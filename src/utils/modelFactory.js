// TODO: 进行拆分，创建多个 model factory
export default function({service, namespace}){
  return {
    namespace: namespace,
    state: {
      editing: null,  // 放置当前所编辑的Id，如果是新增，那么就是 'new'
      list: [],
      current: {},
      total: 0,
      page: 1,
    },
    reducers: {
      save(state, { payload }){
        return {...state, ...payload}
      }
    },
    effects: {
      *fetch({payload:{page = 1, rows = 20}}, {call, put}){
        const {data, headers} = yield call(service.query, {page, rows})
        yield put({type: 'save', payload: {
          list: data.rows,
          total: data.total
        }})
      },
      *beginEdit({payload: {id}}, {call, put}){
        yield put({type: 'read', payload: {id} });
        yield put({type: 'save', payload: {
          editing: id == null ? 'new' : id
        }})
      },
      *read({ payload: {id}}, {call, put, select}){
        let data = {};
        if(id){
          ({data} = yield call(service.read, {id}));
        }
        return yield put({
          type: 'save',
          payload: {
            current: data
          }
        })
      },
      *remove({ payload: {id} }, { call, put }) {
        yield call(service.remove, {id});
        yield put({ type: 'reload' });
      },
      *update({ payload: { id, values } }, { call, put }) {
        yield call(service.update, {id, ...values});
        yield put({ type: 'reload' });
      },
      *create({ payload: {id, values} }, { call, put }) {
        yield call(service.create, values);
        yield put({ type: 'reload' });
      },
      *reload(action, { put, select }) {
        const page = yield select(state => state[namespace].page);
        yield put({ type: 'fetch', payload: { page } });
      },
    },
  };
}
