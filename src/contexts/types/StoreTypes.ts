import { Auth } from 'firebase/auth'
import { Dispatch } from 'react'
import { User } from '../../types/User'

export type AppStateType = {
  phonePageNumber: number
  phonePageSize: number
  brandsPageNumber: number
  brandsPageSize: number
  isLoading: boolean
  auth: Auth
  user: User | null
}

export type ActionType = {
  type: string
  payload?: any
}

export interface AppContextType {
  state: AppStateType
  dispatch: Dispatch<ActionType>
}
