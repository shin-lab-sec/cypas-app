type Radio = {
  type: 'radio'
  choices: string[]
  answers: [string]
}

type Checkbox = {
  type: 'checkbox'
  choices: string[]
  answers: string[]
}

type Text = {
  type: 'text'
  answers: [string]
}

export type Quiz = {
  id: string
  question: string
  explanation: string
  sectionId: string
  createdAt: string
  updatedAt: string
} & (Radio | Checkbox | Text)

export type SectionQuiz = {
  id: string
  name: string
  type: 'quiz'
  quizIds: string[]
  articleIds: string[]
  courseId: string
  createdAt: string
  updatedAt: string
  quizzes: Quiz[]
}
