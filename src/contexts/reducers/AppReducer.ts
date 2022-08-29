import { AppStateType, ActionType } from '../types/StoreTypes'

export const appReducer = (
  state: AppStateType,
  action: ActionType
): AppStateType => {
  switch (action.type) {
    case 'SET_BRANDS_PAGE_NUMBER':
      return {
        ...state,
        brandsPageNumber: action.payload,
      }
    case 'SET_BRANDS_PAGE_SIZE':
      return {
        ...state,
        brandsPageSize: action.payload,
      }
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'SET_PHONE_PAGE_SIZE':
      return {
        ...state,
        phonePageSize: action.payload,
      }
    case 'SET_PHONE_PAGE_NUMBER':
      return {
        ...state,
        phonePageNumber: action.payload,
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
