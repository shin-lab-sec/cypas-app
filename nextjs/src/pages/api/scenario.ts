import { ScenarioPostResponse } from 'features/scenario/apiTypes'
import { getScenarioKey } from 'features/scenario/services'
import { deleteApi, postApi } from 'foundation/utils/server/apiClient'
import { apiHandler } from 'foundation/utils/server/apiHandler'

const curriculum: 'sample-curriculum' = 'sample-curriculum'
const userAgent: 'kali-vdi' | 'kali-wetty' = 'kali-vdi'

export default apiHandler('/api/scenario', {
  async post(req, res) {
    try {
      // TODO: CMSのAPI実装後修正する
      // req.body.curriculumIdを使ってcurriculum, userAgentをfetchしてくる

      const response = await postApi<ScenarioPostResponse>(
        process.env.SMS_DOMAIN + '/scenario',
        {
          scenarioKey: getScenarioKey(curriculum, req.body.ownerName),
          userName: req.body.userName,
          curriculumName: curriculum,
          userAgentName: userAgent,
        },
      )
      return res.json(response)
    } catch (error) {
      return res
        .status(400)
        .json({ message: 'シナリオが起動できませんでした。' } as Error)
    }
  },

  async delete(req, res) {
    try {
      // TODO: CMSのAPI実装後修正する
      // req.body.curriculumIdを使ってcurriculum, userAgentをfetchしてくる

      await deleteApi(process.env.SMS_DOMAIN + '/scenario', {
        scenarioKey: getScenarioKey(curriculum, req.query.userName),
      })

      return res.status(204).json({})
    } catch (error) {
      return res.status(400).json({
        message: 'シナリオを削除できるのはオーナーのみです。',
      } as Error)
    }
  },
})
