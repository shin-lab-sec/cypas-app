import { Prisma } from '@prisma/client'
import {
  SandboxDeleteRequest,
  SandboxDeleteResponse,
  SandboxPostRequest,
  SandboxPostResponse,
} from 'features/sandbox/apiTypes'
import { HttpMethod } from 'foundation/utils/fetchApi'

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
    '/api/sandbox': [SandboxPostRequest, SandboxPostResponse]
  }
  PUT: {}
  DELETE: {
    '/api/sandbox': [SandboxDeleteRequest, SandboxDeleteResponse]
  }
}>
