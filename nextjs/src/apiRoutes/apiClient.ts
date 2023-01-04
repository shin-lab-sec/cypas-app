import { fetchApi as fetchApiOriginal } from 'utils/apiClient'

// 通信先が公的な証明書では無いので、証明書無視
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

export const fetchApi = fetchApiOriginal
