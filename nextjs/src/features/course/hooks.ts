import {
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
} from 'recoil'
import { getApi } from '../../foundation/utils/browser/apiClient'

const getCoursesState = selector({
  key: 'getCourses',
  get: async () => {
    const { data } = await getApi('/cms/courses')
    return data
  },
})

export const useGetCourses = () => {
  const data = useRecoilValueLoadable(getCoursesState)
  const refresher = useRecoilRefresher_UNSTABLE(getCoursesState)

  return [data, refresher] as const
}
