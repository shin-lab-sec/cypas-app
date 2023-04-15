import { Prisma } from '@prisma/client'
import {
  ScenarioDeleteRequest,
  ScenarioDeleteResponse,
  ScenarioPostRequest,
  ScenarioPostResponse,
} from 'features/scenario/apiTypes'
import { HttpMethod } from 'utils/fetchApi'

type Schema<
  T extends Record<
    HttpMethod,
    { [url: string]: [object | undefined, object | undefined] }
  >,
> = T

export type Api = Schema<{
  // メソッド名: {
  //   url: [リクエストの型、レスポンスの型]
  // }
  GET: {
    '/api/hello': [{ message: string; test: number }, { message: string }]
  }
  POST: {
    '/api/users': [Prisma.UserCreateInput, Prisma.UserCreateInput]
    '/api/docker': [{ command: string }, any]
    '/api/scenario': [ScenarioPostRequest, ScenarioPostResponse]
  }
  PUT: {}
  DELETE: {
    '/api/scenario': [ScenarioDeleteRequest, ScenarioDeleteResponse]
  }
}>
