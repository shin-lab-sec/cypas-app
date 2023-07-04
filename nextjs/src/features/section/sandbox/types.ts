import { Useragent } from '../../useragent/types'
import { Article } from '../article/types'

export type SectionSandbox = {
  id: string
  name: string
  type: 'sandbox'
  articleIds: string[]
  scenarioGitHubUrl: string
  userAgentId: string
  courseId: string
  createdAt: string
  updatedAt: string
  userAgent: Useragent
  articles: Article[]
}
