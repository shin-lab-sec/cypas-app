export type Sandbox =
  | {
      status: 'active' | 'creating'
      userName: string
      ownerName: string
      courseId: string
      sectionId: string
      userAgentType: 'vdi' | 'terminal'
    }
  | { status: 'inactive' }
