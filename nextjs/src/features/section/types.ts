import { SectionArticle } from './article/types'
import { SectionQuiz } from './quiz/types'
import { SectionSandbox } from './sandbox/types'

export type Section = SectionQuiz | SectionArticle | SectionSandbox

// セクション一覧の時はセクションごとの詳細を含まない(API都合)
export type Sections = (
  | Omit<SectionQuiz, 'quizzes'>
  | Omit<SectionArticle, 'articles'>
  | Omit<SectionSandbox, 'articles'>
)[]
