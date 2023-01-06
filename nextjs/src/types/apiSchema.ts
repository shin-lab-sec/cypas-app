import { Prisma } from '@prisma/client'
import {
  ScenarioDeleteRequest,
  ScenarioDeleteResponse,
  ScenarioStartRequest,
  ScenarioStartResponse,
} from 'types/scenario'
import { HttpMethod } from 'utils/apiClient'

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
    '/api/scenario': [ScenarioStartRequest, ScenarioStartResponse]
  }
  PUT: {}
  DELETE: {
    '/api/scenario': [ScenarioDeleteRequest, ScenarioDeleteResponse]
  }
}>
