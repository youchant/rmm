import serviceFactory from '../utils/serviceFactory';

export default serviceFactory({
  login: 'post /api/login',
  current: 'get /api/user',
  logout: 'get /api/logout',
})
