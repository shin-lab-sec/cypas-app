import { useEffect } from 'react'
import { useRecoilCallback } from 'recoil'
import { deleteApi, postApi } from './../../foundation/utils/browser/apiClient'
import { SessionUser } from 'features/auth/types'
import { sandboxState } from 'features/sandbox/atoms'
import {
  inactiveToReady,
  readyToCreating,
  toError,
  creatingToActive,
  getSandboxUrl,
  activeToDeleting,
  deletingToInactive,
  readyToInactive,
} from 'features/sandbox/services'
import { SandboxInfo } from 'features/sandbox/types'

export const useReadySandbox = (info: SandboxInfo) => {
  const readySandbox = useRecoilCallback(
    ({ set }) =>
      () => {
        set(sandboxState, s =>
          s.status === 'inactive' ? inactiveToReady(s, info) : s,
        )
      },
    [],
  )

  const unReadySandbox = useRecoilCallback(
    ({ set }) =>
      () => {
        set(sandboxState, s => (s.status === 'ready' ? readyToInactive(s) : s))
      },
    [],
  )

  useEffect(() => {
    readySandbox()

    return () => unReadySandbox()
  }, [readySandbox, unReadySandbox])

  return { readySandbox }
}

export const useStartSandbox = () => {
  const startSandbox = useRecoilCallback(
    ({ snapshot, set }) =>
      async (user: SessionUser, ownerName?: string) => {
        const sandbox = await snapshot.getPromise(sandboxState)

        if (sandbox.status === 'active') {
          return alert('既にactiveです')
        }

        set(sandboxState, s =>
          s.status === 'ready'
            ? readyToCreating(s)
            : toError('error: no ready sandbox'),
        )

        try {
          const { key: sandboxKey } = await postApi('/api/sandbox', {
            scenarioId: 'id',
            ownerName: ownerName || user.name,
            userName: user.name,
          })

          set(sandboxState, s =>
            s.status === 'creating'
              ? creatingToActive(s, getSandboxUrl(sandboxKey))
              : toError('error: no creating sandbox'),
          )
        } catch (error) {
          set(sandboxState, toError('failed to get sandbox key'))
          throw error
        }
      },
    [],
  )

  return { startSandbox }
}

export const useDeleteSandbox = () => {
  const deleteSandbox = useRecoilCallback(
    ({ snapshot, set }) =>
      async (user: SessionUser) => {
        const sandbox = await snapshot.getPromise(sandboxState)

        if (sandbox.status === 'inactive') {
          return alert('既にinactiveです')
        }

        set(sandboxState, s =>
          s.status === 'active'
            ? activeToDeleting(s)
            : toError('error: no active sandbox'),
        )

        try {
          await deleteApi('/api/sandbox', {
            scenarioId: 'id',
            userName: user.name,
          })

          set(sandboxState, s =>
            s.status === 'deleting'
              ? deletingToInactive(s)
              : toError('error: no deleting sandbox'),
          )
        } catch (error) {
          set(sandboxState, toError('failed to delete sandbox'))
          throw error
        }
      },
    [],
  )

  return { deleteSandbox }
}

export const useSyncSandbox = () => {
  const syncSandbox = useRecoilCallback(
    () => () => {
      //同期させる処理
    },
    [],
  )

  return { syncSandbox }
}
