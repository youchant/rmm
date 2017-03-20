import serviceFactory from '../utils/serviceFactory';

export default serviceFactory({
  query: 'post /api/roles',
  read: 'get /api/roles/:id',
  create: 'post /api/roles',
  update: 'put /api/roles/:id',
  remove: 'delete /api/roles/:id'
})
