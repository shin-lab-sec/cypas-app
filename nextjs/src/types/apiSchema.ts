import { Prisma } from '@prisma/client'
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
    '@api/hello': [{ message: string; test: number }, { message: string }]
    '@server/redis': [undefined, { massage: string }]
  }
  POST: {
    '@api/users': [Prisma.UserCreateInput, Prisma.UserCreateInput]
    '@server/docker': [{ command: string }, any]
    '@server/scenario': [{ userId: string; userName: string }, { key: string }]
  }
  PUT: {}
  DELETE: {
    '@server/scenario': [{ userId: string }, undefined]
  }
}>
