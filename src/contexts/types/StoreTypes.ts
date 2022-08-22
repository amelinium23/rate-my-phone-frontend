import { Auth } from 'firebase/auth'
import { Dispatch } from 'react'

export type AppStateType = {
  phonePageNumber: number
  phonePageSize: number
  brandsPageNumber: number
  brandsPageSize: number
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
