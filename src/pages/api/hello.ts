import { apiHandler } from 'utils/api/apiHandler'

export default apiHandler('/api/hello', {
  getHandler(_req, res) {
    res.send({ message: 'hello!' })
  },
})
