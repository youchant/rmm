import logo from '../assets/logo.svg';

export default {
  namespace: 'app',
  state: {
    name: 'Test Application',
    logoSrc: logo,
    sidebarCollapsed: false
  },
  reducers: {
    save(state, { payload }){
      return {...state, ...payload}
    },
    toggleSider (state, {payload: {collapsed}}) {
      return {...state, sidebarCollapsed: collapsed}
    },
    login (state, {payload: login}){
      return {...state, login}
    }
  },
  effects: {},
  subscriptions: {
    setup({ history, dispatch }){
      //document.title = state.app.name;
      return history.listen(({pathname, query}) => {
        dispatch({type: 'personals/current'})
      })
    }
  },
};
