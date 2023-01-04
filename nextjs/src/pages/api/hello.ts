import { apiHandler } from 'apiRoutes/apiHandler'

export default apiHandler('/api/hello', {
  get(req, res) {
    res.send({ message: req.query.message })
  },
  // 例
  post(req, res) {},
  put(req, res) {},
  delete(req, res) {},
})
