import useSWR, { KeyedMutator } from 'swr'

type AppState = {
  openNavbar: boolean
}

const initState: AppState = {
  openNavbar: true,
}

// グローバルステートを管理するhooks
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
