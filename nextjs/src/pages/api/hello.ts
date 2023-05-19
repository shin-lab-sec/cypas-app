import { apiHandler } from 'foundation/utils/server/apiHandler'

export default apiHandler('/api/hello', {
  async get(req, res) {
    res.send({ message: req.query.message })
  },
  // 例
  async post(req, res) {},
  async put(req, res) {},
  async delete(req, res) {},
})
