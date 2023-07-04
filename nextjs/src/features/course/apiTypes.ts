import { Course } from './types'

export type CoursesGetRequest = undefined

export type CoursesGetResponse = {
  data: Omit<Course, 'sections'>[]
}

export type CourseGetRequest = {
  id: string
}

export type CourseGetResponse = {
  data: Course
}
