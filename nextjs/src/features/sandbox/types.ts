export type SandboxInfo = {
  userName: string
  ownerName: string
  courseId: string
  sectionId: string
  userAgentType: 'vdi' | 'terminal'
}

export type Sandbox =
  | { status: 'inactive' | 'deleting' }
  | ({
      status: 'ready' | 'creating'
    } & SandboxInfo)
  | ({
      status: 'active'
      sandboxUrl: string
    } & SandboxInfo)
  | { status: 'error'; message: string }
