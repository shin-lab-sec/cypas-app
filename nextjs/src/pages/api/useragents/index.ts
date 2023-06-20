import { UseragentsGetResponse } from 'features/useragent/apiTypes'
import { getApi } from 'foundation/utils/server/apiClient'
import { postApi } from 'foundation/utils/server/apiClient'
import { apiHandler } from 'foundation/utils/server/apiHandler'

export default apiHandler('/api/useragents', {
  async get(req, res) {
    try {
      const response = await getApi<UseragentsGetResponse>(
        process.env.CMS_URL + '/api/v1/useragents',
      )
      return res.json(response)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
})
