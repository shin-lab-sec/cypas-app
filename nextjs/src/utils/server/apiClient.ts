import { fetchApi } from '../fetchApi'

// 通信先が公的な証明書では無いので、証明書無視
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

export const getApi = async <T>(url: string, params?: any) =>
  fetchApi<T>(url, 'GET', params)

export const postApi = async <T>(url: string, params?: any) =>
  fetchApi<T>(url, 'POST', params)

export const putApi = async <T>(url: string, params?: any) =>
  fetchApi<T>(url, 'PUT', params)

export const deleteApi = async (url: string, params?: any) =>
  fetchApi<undefined>(url, 'DELETE', params)
