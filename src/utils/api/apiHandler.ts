import type { NextApiRequest, NextApiResponse } from 'next'
import { Api } from 'types/apiSchema'

type UrlMap =
  | keyof Api['GET']
  | keyof Api['POST']
  | keyof Api['PUT']
  | keyof Api['DELETE']

type ApiGetRequest<T> = Omit<NextApiRequest, 'body' | 'query'> & { query: T }
type ApiRequest<T> = Omit<NextApiRequest, 'body'> & { body: T }
type ApiResponse<T> = NextApiResponse<T>

export const apiHandler =
  <Url extends UrlMap>(
    _url: Url,
    handlers: {
      getHandler?: (
        req: ApiGetRequest<
          Url extends keyof Api['GET'] ? Api['GET'][Url][0] : undefined
        >,
        res: ApiResponse<
          Url extends keyof Api['GET'] ? Api['GET'][Url][1] : undefined
        >,
      ) => void
      postHandler?: (
        req: ApiRequest<
          Url extends keyof Api['POST'] ? Api['POST'][Url][0] : undefined
        >,
        res: ApiResponse<
          Url extends keyof Api['POST'] ? Api['POST'][Url][1] : undefined
        >,
      ) => void
      putHandler?: (
        req: ApiRequest<
          Url extends keyof Api['PUT'] ? Api['PUT'][Url][0] : undefined
        >,
        res: ApiResponse<
          Url extends keyof Api['PUT'] ? Api['PUT'][Url][1] : undefined
        >,
      ) => void
      deleteHandler?: (
        req: ApiRequest<
          Url extends keyof Api['DELETE'] ? Api['DELETE'][Url][0] : undefined
        >,
        res: ApiResponse<
          Url extends keyof Api['DELETE'] ? Api['DELETE'][Url][1] : undefined
        >,
      ) => void
    },
  ) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'GET':
        handlers.getHandler?.(
          // req.queryに強制的に型を付けるため
          req as unknown as ApiGetRequest<
            Url extends keyof Api['GET'] ? Api['GET'][Url][0] : undefined
          >,
          res,
        )
        break
      case 'POST':
        handlers.postHandler?.(req, res)
        break
      case 'PUT':
        handlers.putHandler?.(req, res)
        break
      case 'DELETE':
        handlers.deleteHandler?.(req, res)
        break
      default:
        res.status(405).json({ message: 'unknown method' })
    }
  }
