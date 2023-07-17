import {
  selectorFamily,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
} from 'recoil'
import { getApi } from '../../foundation/utils/browser/apiClient'

const getSectionState = selectorFamily({
  key: 'getSectionState',
  get: (id: string) => async () => {
    const { data } = await getApi('/cms/sections/:id', { id })
    return data
  },
})

export const useGetSection = (id: string) => {
  const data = useRecoilValueLoadable(getSectionState(id))
  const refresher = useRecoilRefresher_UNSTABLE(getSectionState(id))

  return [data, refresher] as const
}
