import { HttpMethod } from '../utils/api'

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
    'api.localhost.com/redis': [undefined, { massage: string }]
  }
  POST: {
    'api.localhost.com/docker': [{ command: string }, any]
    'api.localhost.com/terminal/start': [{ key: string }, undefined]
    'api.localhost.com/terminal/delete': [{ key: string }, undefined]
  }
  PUT: {}
  DELETE: {}
}>
