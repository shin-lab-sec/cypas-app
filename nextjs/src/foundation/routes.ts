type Route = {
  title: string
  href: `/${string}`
}

const routes = {
  '/home': {
    title: 'ホーム',
    href: '/home',
  },
  '/sandbox': {
    title: '起動中のサンドボックス',
    href: '/sandbox',
  },
  '/courses': {
    title: 'コース',
    href: '/courses',
  },
  '/courses/:id': ({ title, id }) => ({
    title,
    href: `/courses/${id}`,
  }),
  '/curriculum/:id': ({ id }) => ({
    title: 'カリキュラムタイトル',
    href: `/curriculum/${id}`,
  }),
} as const
// エラーになるので一旦コメントアウト
//  satisfies Record<
//   `/${string}`,
//   Route | ((arg: Record<string, string>) => Route)
// >

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]

export const getRoute = <Key extends keyof typeof routes>(
  key: Key,
  ...args: Key extends FunctionKeys<typeof routes>
    ? [Parameters<(typeof routes)[Key]>[0]]
    : []
): Route => {
  const route = routes[key]

  return (
    typeof route === 'function' ? (route as any)(args.at(0)) : route
  ) as Route
}
