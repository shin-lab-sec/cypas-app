import { fetchApi } from 'apiRoutes/apiClient'
import { apiHandler } from 'apiRoutes/apiHandler'

export default apiHandler('/api/docker', {
  async post(req, res) {
    try {
      const response = await fetchApi<object>(
        process.env.API_URL + '/docker',
        'POST',
        req.body,
      )
      return res.json(response)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
})
