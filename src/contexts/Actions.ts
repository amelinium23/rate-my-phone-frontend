import { Dispatch } from 'react'
import { ActionType } from './types/StoreTypes'

const setIsLoading = (dispatch: Dispatch<ActionType>, isLoading: boolean) =>
  dispatch({ type: 'SET_IS_LOADING', payload: isLoading })

export { setIsLoading }
