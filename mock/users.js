export default {
  'get /api/users': {
    success: true,
    data: {
      rows: [{
        id: '001',
        name: 'admin',
        nickname: 'admin',
        password: 'admin'
      }, {
        id: '002',
        name: 'guest',
        nickname: 'guest',
        password: 'guest'
      }]
    },
  },
  'get /api/users/:id': {
    success: true,
    data: {
      id: '001',
      name: 'admin',
      nickname: 'admin',
      password: 'admin'
    }
  },
  'delete /api/users/:id': {
    success: true
  },

}
