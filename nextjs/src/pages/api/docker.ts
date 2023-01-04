import { apiHandler } from 'utils/apiHandler'
import { isEmptyObj } from 'utils/isEmptyObj'

// 通信先が公的な証明書では無いので、証明書無視
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

export default apiHandler('/api/docker', {
  async post(req, res) {
    try {
      const response = await fetch(process.env.API_URL + '/docker', {
        method: 'POST',
        body: isEmptyObj(req.body) ? null : JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        return res.status(400).json({ massage: 'server error' })
      }
      return res.json(await response.json())
    } catch (error) {
      return res.status(400).json(error)
    }
  },
})
