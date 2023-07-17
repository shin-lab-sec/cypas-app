import {
  selector,
  selectorFamily,
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

const getCourseState = selectorFamily({
  key: 'getCourse',
  get: (id: string) => async () => {
    const { data } = await getApi('/cms/courses/:id', { id })
    return data
  },
})

export const useGetCourse = (id: string) => {
  const data = useRecoilValueLoadable(getCourseState(id))
  const refresher = useRecoilRefresher_UNSTABLE(getCourseState(id))

  return [data, refresher] as const
}
