/* eslint-disable no-unused-vars */
export type AppStateType = {
  pageNumber: number
  pageSize: number
  isLoading: boolean
}

export type ActionType = {
  type: AppActionType
  payload?: any
}

export enum AppActionType {
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER',
  SET_PAGE_SIZE = 'SET_PAGE_SIZE',
  SET_IS_LOADING = 'SET_IS_LOADING',
}
