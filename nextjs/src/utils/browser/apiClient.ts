import { Api } from '../../apiSchema'
import { fetchApi } from '../fetchApi'

// 余剰プロパティチェック
export type StrictPropertyCheck<T, TExpected> = Exclude<
  keyof T,
  keyof TExpected
> extends never
  ? T
  : never

export const getApi = async <
  Url extends keyof Api['GET'],
  Request extends Api['GET'][Url][0],
  Response extends Api['GET'][Url][1],
>(
  url: Url,
  ...args: Request extends undefined
    ? []
    : [StrictPropertyCheck<Request, Api['GET'][Url][0]>]
) => fetchApi<Response>(url, 'GET', args.at(0))

export const postApi = async <
  Url extends keyof Api['POST'],
  Request extends Api['POST'][Url][0],
  Response extends Api['POST'][Url][1],
>(
  url: Url,
  ...args: Request extends undefined
    ? []
    : [StrictPropertyCheck<Request, Api['POST'][Url][0]>]
) => fetchApi<Response>(url, 'POST', args.at(0))

export const putApi = async <
  Url extends keyof Api['PUT'],
  Request extends Api['PUT'][Url][0],
  Response extends Api['PUT'][Url][1],
>(
  url: Url,
  ...args: Request extends undefined
    ? []
    : [StrictPropertyCheck<Request, Api['PUT'][Url][0]>]
) => fetchApi<Response>(url, 'PUT', args.at(0))

export const deleteApi = async <
  Url extends keyof Api['DELETE'],
  Request extends Api['DELETE'][Url][0],
>(
  url: Url,
  ...args: Request extends undefined
    ? []
    : [StrictPropertyCheck<Request, Api['DELETE'][Url][0]>]
) => fetchApi<undefined>(url, 'DELETE', args.at(0))
