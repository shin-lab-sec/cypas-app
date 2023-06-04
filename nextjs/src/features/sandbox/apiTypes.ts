export type SandboxPostRequest = {
  scenarioId: string
  ownerName: string
  userName: string
}

export type SandboxPostResponse = {
  key: string
}

export type SandboxDeleteRequest = {
  scenarioId: string
  userName: string
}

export type SandboxDeleteResponse = {}
