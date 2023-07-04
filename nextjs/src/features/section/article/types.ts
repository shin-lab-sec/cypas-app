export type Article = {
  id: string
  body: string
  createdAt: string
  updatedAt: string
}

export type SectionArticle = {
  id: string
  name: string
  type: 'article'
  articleIds: string[]
  courseId: string
  createdAt: string
  updatedAt: string
  articles: Article[]
}
