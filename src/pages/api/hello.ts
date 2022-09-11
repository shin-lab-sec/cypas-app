import { apiHandler } from 'utils/apiHandler'

export default apiHandler('@api/hello', {
  getHandler(req, res) {
    res.send({ message: req.query.message })
  },
})
