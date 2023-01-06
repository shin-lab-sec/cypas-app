import { fetchApi } from 'apiRoutes/apiClient'
import { apiHandler } from 'apiRoutes/apiHandler'
import { ScenarioDeleteResponse, ScenarioStartResponse } from 'types/scenario'

export default apiHandler('/api/scenario', {
  async post(req, res) {
    try {
      const response = await fetchApi<ScenarioStartResponse>(
        process.env.API_URL + '/scenario',
        'POST',
        req.body,
      )
      return res.json(response)
    } catch (error) {
      return res.status(400).json(error as Error)
    }
  },

  async delete(req, res) {
    try {
      const response = await fetchApi<ScenarioDeleteResponse>(
        process.env.API_URL + '/scenario',
        'DELETE',
        req.body,
      )
      return res.json(response)
    } catch (error) {
      return res.status(400).json(error as Error)
    }
  },
})
