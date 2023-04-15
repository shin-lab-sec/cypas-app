import { ScenarioPostResponse } from 'features/scenario/apiTypes'
import { deleteApi, postApi } from 'utils/server/apiClient'
import { apiHandler } from 'utils/server/apiHandler'

export default apiHandler('/api/scenario', {
  async post(req, res) {
    try {
      const response = await postApi<ScenarioPostResponse>(
        process.env.API_URL + '/scenario',
        req.body,
      )
      return res.json(response)
    } catch (error) {
      return res.status(400).json(error as Error)
    }
  },

  async delete(req, res) {
    try {
      const response = await deleteApi(
        process.env.API_URL + '/scenario',
        req.body,
      )
      return res.json(response)
    } catch (error) {
      return res.status(400).json(error as Error)
    }
  },
})
