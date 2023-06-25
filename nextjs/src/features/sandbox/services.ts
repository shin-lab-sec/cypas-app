import {
  ActiveSandbox,
  CreatingSandbox,
  DeletingSandbox,
  ErrorSandbox,
  InactiveSandbox,
  ReadySandbox,
  SandboxInfo,
} from 'features/sandbox/types'

export const getSandboxKey = (scenarioName: string, ownerName: string) =>
  `${scenarioName}-${ownerName}`

export const getSandboxUrl = (sandboxKey: string) =>
  `${process.env.NEXT_PUBLIC_USERAGENT_URL}/sandbox?key=${sandboxKey}`

export const readyToCreating = (sandbox: ReadySandbox): CreatingSandbox => ({
  ...sandbox,
  status: 'creating',
})

export const creatingToActive = (
  sandbox: CreatingSandbox,
  url: string,
): ActiveSandbox => ({
  ...sandbox,
  status: 'active',
  sandboxUrl: url,
})

export const inactiveToReady = (
  _sandbox: InactiveSandbox,
  info: SandboxInfo,
): ReadySandbox => ({
  ...info,
  status: 'ready',
})

export const readyToInactive = (_sandbox: ReadySandbox): InactiveSandbox => ({
  status: 'inactive',
})

export const activeToDeleting = (_sandbox: ActiveSandbox): DeletingSandbox => ({
  status: 'deleting',
})

export const deletingToInactive = (
  _sandbox: DeletingSandbox,
): InactiveSandbox => ({
  status: 'inactive',
})

export const toError = (message: string): ErrorSandbox => ({
  status: 'error',
  message,
})
