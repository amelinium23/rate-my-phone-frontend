import { AppStateType, ActionType, AppActionType } from '../types/StoreTypes'

export const appReducer = (
  state: AppStateType,
  action: ActionType
): AppStateType => {
  switch (action.type) {
    case AppActionType.SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload,
      }
    case AppActionType.SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
      }
    default:
      return state
  }
}
