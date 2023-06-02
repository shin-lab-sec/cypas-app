export type Sandbox =
  | {
      status: 'active' | 'creating'
      userName: string
      ownerName: string
      courseId: string
      curriculumId: string
      userAgentType: 'vdi' | 'terminal'
    }
  | { status: 'inactive' }
