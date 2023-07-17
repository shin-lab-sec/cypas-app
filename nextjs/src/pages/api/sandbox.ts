import { SandboxPostResponse } from 'features/sandbox/apiTypes'
import { getSandboxKey } from 'features/sandbox/services'
import { deleteApi, postApi } from 'foundation/utils/server/apiClient'
import { apiHandler } from 'foundation/utils/server/apiHandler'

const scenario: 'sample-scenario' = 'sample-scenario'
const userAgent: 'kali-vdi' | 'kali-wetty' = 'kali-wetty'

export default apiHandler('/api/sandbox', {
  async post(req, res) {
    try {
      // TODO: CMSのAPI実装後修正する
      // req.body.sandboxIdを使ってscenario, userAgentをfetchしてくる

      const response = await postApi<SandboxPostResponse>(
        process.env.SMS_URL + '/sandbox',
        {
          sandboxKey: getSandboxKey(scenario, req.body.ownerName),
          userName: req.body.userName,
          scenarioName: scenario,
          userAgentName: userAgent,
        },
      )
      return res.json(response)
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ message: 'サンドボックスが起動できませんでした。' } as Error)
    }
  },

  async delete(req, res) {
    try {
      // TODO: CMSのAPI実装後修正する
      // req.body.sandboxIdを使ってscenario, userAgentをfetchしてくる

      await deleteApi(process.env.SMS_URL + '/sandbox', {
        sandboxKey: getSandboxKey(scenario, req.query.userName),
      })

      return res.status(204).end()
    } catch (error) {
      return res.status(400).json({
        message: 'サンドボックスを削除できるのはオーナーのみです。',
      } as Error)
    }
  },
})
