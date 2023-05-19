import type { NextPage } from 'next'
import { useVerifiedSession } from '../features/auth/hooks'
import { DashBoardLayout } from 'layouts/DashBoardLayout'

const DashBoard: NextPage = () => {
  const session = useVerifiedSession()

  return <DashBoardLayout>ダッシュボード</DashBoardLayout>
}

export default DashBoard
