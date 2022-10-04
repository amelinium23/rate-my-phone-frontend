import { Auth } from 'firebase/auth'
import { Dispatch } from 'react'

import { User } from '../../types'

export type State = {
  phonePageNumber: number
  phonePageSize: number
  brandsPageNumber: number
  brandsPageSize: number
  brandsSortMode: string
  isLoading: boolean
  auth: Auth
  user: User | null
}

export type Action = {
  type: string
  payload?: any
}

export interface Context {
  state: State
  dispatch: Dispatch<Action>
}
