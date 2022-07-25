import { AppStateType, ActionType } from '../types/StoreTypes'

export const appReducer = (
  state: AppStateType,
  action: ActionType
): AppStateType => {
  switch (action.type) {
    default:
      return state
  }
}
