import serviceFactory from '../utils/serviceFactory';

export default serviceFactory({
  query: 'get /api/users',
  read: 'get /api/users/:id',
  create: 'post /api/users',
  update: 'put /api/users/:id',
  remove: 'delete /api/users/:id'
})
