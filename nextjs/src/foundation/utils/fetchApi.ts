import { isEmptyObj } from './isEmptyObj'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export class ApiError extends Error {
  url: string
  statusText: string
  message: string
  constructor(url: string, statusText: string, message: string) {
    super()
    this.name = 'ApiError'
    this.url = url
    this.statusText = statusText
    this.message = message
  }
  public static init = async (response: Response) => {
    const json = (await response.json()) as { message: string }
    return new ApiError(
      response.url,
      response.status + ' ' + response.statusText,
      json.message,
    )
  }
}

export const fetchApi = async <T>(
  url: string,
  method: HttpMethod,
  params?: Record<string, any>,
  headers?: Record<string, string>,
): Promise<T> => {
  let requestUrl = url
  let requestParams = { ...params }
  let requestHeaders = headers || {}

  // /example/:id -> /example/1
  requestUrl = requestUrl
    .split('/')
    .map(segment => {
      if (segment[0] === ':' && params) {
        const { [segment.slice(1)]: _embedInUrl, ...rest } = requestParams
        requestParams = rest
        return params[segment.slice(1)] as string
      }
      return segment
    })
    .join('/')

  // /example/1 -> /example/1?searchWord="あああ"
  if (method === 'GET' || method === 'DELETE') {
    requestUrl += getQueryString(requestParams)
    requestParams = {}
  }

  if (!isEmptyObj(requestParams)) {
    requestHeaders['Content-Type'] = 'application/json'
  }

  let result
  try {
    const res = await fetch(encodeURI(requestUrl), {
      method,
      body: isEmptyObj(requestParams) ? null : JSON.stringify(requestParams),
      headers: { ...requestHeaders },
    })

    if (!res.ok) {
      throw await ApiError.init(res)
    }
    result = await res.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('unknown error')
  }

  return result as T
}

const getQueryString = (params?: object | undefined): string => {
  return params
    ? `?${Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`
    : ''
}
