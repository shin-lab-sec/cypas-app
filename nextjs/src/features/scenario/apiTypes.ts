export type ScenarioPostRequest = {
  curriculumId: string
  ownerName: string
  userName: string
}

export type ScenarioPostResponse = {
  key: string
}

export type ScenarioDeleteRequest = {
  curriculumId: string
  userName: string
}

export type ScenarioDeleteResponse = {}
