import { Prisma } from '@prisma/client'
import {
  CourseGetRequest,
  CourseGetResponse,
  CoursesGetRequest,
  CoursesGetResponse,
} from 'features/course/apiTypes'
import {
  SandboxDeleteRequest,
  SandboxDeleteResponse,
  SandboxPostRequest,
  SandboxPostResponse,
} from 'features/sandbox/apiTypes'
import {
  SectionGetRequest,
  SectionGetResponse,
} from 'features/section/apiTypes'
import { HttpMethod } from 'foundation/utils/fetchApi'

type Schema<
  T extends Record<
    HttpMethod,
    {
      // api routes or cms
      [url: `/api/${string}` | `/cms/${string}`]: [
        object | undefined,
        object | undefined,
      ]
    }
  >,
> = T

export type Api = Schema<{
  // メソッド名: {
  //   url: [リクエストの型、レスポンスの型]
  // }
  GET: {
    '/api/hello': [{ message: string; test: number }, { message: string }]
    '/cms/courses': [CoursesGetRequest, CoursesGetResponse]
    '/cms/courses/:id': [CourseGetRequest, CourseGetResponse]
    '/cms/sections/:id': [SectionGetRequest, SectionGetResponse]
  }
  POST: {
    '/api/users': [Prisma.UserCreateInput, Prisma.UserCreateInput]
    '/api/docker': [{ command: string }, any]
    '/api/sandbox': [SandboxPostRequest, SandboxPostResponse]
  }
  PUT: {}
  DELETE: {
    '/api/sandbox': [SandboxDeleteRequest, SandboxDeleteResponse]
  }
}>
