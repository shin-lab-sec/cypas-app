import { Sections } from '../section/types'

export type Course = {
  id: string
  name: string
  description: string
  level: number
  imageUrl: string
  sectionIds: string[]
  author: string
  organization: string
  createdAt: string
  updatedAt: string
  sections: Sections
}
