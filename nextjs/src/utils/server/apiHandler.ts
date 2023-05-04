import type { NextApiRequest, NextApiResponse } from 'next'
import { Session, getServerSession } from 'next-auth'
import { Api } from '../../apiSchema'
import { authOptions } from 'pages/api/auth/[...nextauth]'

type UrlMap =
  | keyof Api['GET']
  | keyof Api['POST']
  | keyof Api['PUT']
  | keyof Api['DELETE']

type ApiNonBodyRequest<T> = Omit<NextApiRequest, 'body' | 'query'> & {
  query: T
}
type ApiNonQueryRequest<T> = Omit<NextApiRequest, 'body' | 'query'> & {
  body: T
}

type ApiResponse<T> = NextApiResponse<T>

export const apiHandler =
  <Url extends UrlMap>(
    _url: Url,
    handlers: {
      get?: (
        req: ApiNonBodyRequest<
          Url extends keyof Api['GET'] ? Api['GET'][Url][0] : undefined
        >,
        res: ApiResponse<
          Url extends keyof Api['GET'] ? Api['GET'][Url][1] | Error : undefined
        >,
        session: Session,
      ) => Promise<void>
      post?: (
        req: ApiNonQueryRequest<
          Url extends keyof Api['POST'] ? Api['POST'][Url][0] : undefined
        >,
        res: ApiResponse<
          Url extends keyof Api['POST']
            ? Api['POST'][Url][1] | Error
            : undefined
        >,
        session: Session,
      ) => Promise<void>
      put?: (
        req: ApiNonQueryRequest<
          Url extends keyof Api['PUT'] ? Api['PUT'][Url][0] : undefined
        >,
        res: ApiResponse<
          Url extends keyof Api['PUT'] ? Api['PUT'][Url][1] | Error : undefined
        >,
        session: Session,
      ) => Promise<void>
      delete?: (
        req: ApiNonBodyRequest<
          Url extends keyof Api['DELETE'] ? Api['DELETE'][Url][0] : undefined
        >,
        res: ApiResponse<
          Url extends keyof Api['DELETE']
            ? Api['DELETE'][Url][1] | Error
            : undefined
        >,
        session: Session,
      ) => Promise<void>
    },
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(403).json({ message: 'unauthorized error' })
    }

    switch (req.method) {
      case 'GET':
        await handlers.get?.(
          // req.queryに強制的に型を付けるため
          req as unknown as ApiNonBodyRequest<
            Url extends keyof Api['GET'] ? Api['GET'][Url][0] : undefined
          >,
          res,
          session,
        )
        break
      case 'POST':
        await handlers.post?.(req, res, session)
        break
      case 'PUT':
        await handlers.put?.(req, res, session)
        break
      case 'DELETE':
        await handlers.delete?.(
          // req.queryに強制的に型を付けるため
          req as unknown as ApiNonBodyRequest<
            Url extends keyof Api['DELETE'] ? Api['DELETE'][Url][0] : undefined
          >,
          res,
          session,
        )
        break
      default:
        res.status(405).json({ message: 'unknown method' })
    }
  }
