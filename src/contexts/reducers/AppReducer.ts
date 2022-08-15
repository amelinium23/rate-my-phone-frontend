import { AppStateType, ActionType } from '../types/StoreTypes'

export const appReducer = (
  state: AppStateType,
  action: ActionType
): AppStateType => {
  switch (action.type) {
    case 'SET_PAGE_NUMBER':
      return {
        ...state,
        pageNumber: action.payload,
      }
    case 'SET_PAGE_SIZE':
      return {
        ...state,
        pageSize: action.payload,
      }
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}
