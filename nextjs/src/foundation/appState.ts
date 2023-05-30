import useSWR, { KeyedMutator } from 'swr'

type AppState = {
  openNavbar: boolean
  sandbox: {
    status: 'active' | 'inactive' | 'creating'
    userName: string
    ownerName: string
    courseId: string
    curriculumId: string
    userAgentType: 'vdi' | 'terminal'
  }
}

const initState: AppState = {
  openNavbar: true,
}

export const useAppState = <Path extends keyof AppState>(
  path: Path,
): [AppState[Path], KeyedMutator<AppState[Path]>] => {
  const { data, mutate } = useSWR<AppState[Path]>(path, null, {
    fallbackData: initState[path],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [data as AppState[Path], mutate]
}
