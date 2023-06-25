import { atom, useRecoilValue } from 'recoil'
import { Sandbox } from './types'

export const sandboxState = atom<Sandbox>({
  key: 'sandbox/atom',
  default: {
    status: 'inactive',
  },
})

export const useSandboxValue = () => useRecoilValue(sandboxState)
