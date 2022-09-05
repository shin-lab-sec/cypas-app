import { HttpMethod } from '../utils/api/api'

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
    '/server/redis': [undefined, { massage: string }]
  }
  POST: {
    '/server/docker': [{ command: string }, any]
    '/server/terminal/start': [{ userId: string }, { key: string }]
    '/server/terminal/delete': [{ userId: string }, undefined]
  }
  PUT: {}
  DELETE: {}
}>
