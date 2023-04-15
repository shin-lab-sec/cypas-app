import { postApi } from 'utils/server/apiClient'
import { apiHandler } from 'utils/server/apiHandler'

export default apiHandler('/api/docker', {
  async post(req, res) {
    try {
      const response = await postApi<object>(
        process.env.API_URL + '/docker',
        req.body,
      )
      return res.json(response)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
})
