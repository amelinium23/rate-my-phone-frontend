import { Dispatch } from 'react'
import { User } from '../types/User'
import { ActionType } from './types/StoreTypes'

const setIsLoading = (dispatch: Dispatch<ActionType>, isLoading: boolean) =>
  dispatch({ type: 'SET_IS_LOADING', payload: isLoading })

const setBrandPageSize = (dispatch: Dispatch<ActionType>, pageSize: number) =>
  dispatch({ type: 'SET_BRANDS_PAGE_SIZE', payload: pageSize })

const setBrandsPageNumber = (
  dispatch: Dispatch<ActionType>,
  pageNumber: number
) => dispatch({ type: 'SET_BRANDS_PAGE_NUMBER', payload: pageNumber })

const setPhonePageSize = (dispatch: Dispatch<ActionType>, pageSize: number) =>
  dispatch({ type: 'SET_PHONE_PAGE_SIZE', payload: pageSize })

const setPhonePageNumber = (
  dispatch: Dispatch<ActionType>,
  pageNumber: number
) => dispatch({ type: 'SET_PHONE_PAGE_NUMBER', payload: pageNumber })

const setUser = (dispatch: Dispatch<ActionType>, user: User) =>
  dispatch({ type: 'SET_USER', payload: user })

const setBrandSortMode = (dispatch: Dispatch<ActionType>, sortMode: string) =>
  dispatch({ type: 'SET_BRANDS_SORTING_MODE', payload: sortMode })

export {
  setIsLoading,
  setBrandPageSize,
  setBrandsPageNumber,
  setPhonePageSize,
  setPhonePageNumber,
  setUser,
  setBrandSortMode,
}
