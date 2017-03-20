export default {
  'post /api/login': (req, res) => {
    // roadhog 在当前版本还没有引入处理body相关的中间件，因此 req.body 获取不到
    res.json({
      success: true
    })
  },
  'get /api/logout': {
    success: true
  },
  '/api/user': {
    success: true,
    data: {
      name: 'admin',
      nickname: 'admin'
    },
  }
}
