import { Auth } from 'firebase/auth'
import { Dispatch } from 'react'

export type AppStateType = {
  pageNumber: number
  pageSize: number
  isLoading: boolean
  auth: Auth
}

export type ActionType = {
  type: string
  payload?: any
}

export interface AppContextType {
  state: AppStateType
  dispatch: Dispatch<ActionType>
}
