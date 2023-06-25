export type SandboxInfo = {
  userName: string
  ownerName: string
  courseId: string
  sectionId: string
  userAgentType: 'vdi' | 'terminal'
}

export type InactiveSandbox = { status: 'inactive' }
export type DeletingSandbox = { status: 'deleting' }
export type ReadySandbox = { status: 'ready' } & SandboxInfo
export type CreatingSandbox = { status: 'creating' } & SandboxInfo
export type ActiveSandbox = {
  status: 'active'
  sandboxUrl: string
} & SandboxInfo
export type ErrorSandbox = { status: 'error'; message: string }

export type Sandbox =
  | InactiveSandbox
  | DeletingSandbox
  | ReadySandbox
  | CreatingSandbox
  | ActiveSandbox
  | ErrorSandbox
