import { Dispatch } from 'react'

import { User } from '../types'
import { Action } from './types'

const setIsLoading = (dispatch: Dispatch<Action>, isLoading: boolean) =>
  dispatch({ type: 'SET_IS_LOADING', payload: isLoading })

const setBrandPageSize = (dispatch: Dispatch<Action>, pageSize: number) =>
  dispatch({ type: 'SET_BRANDS_PAGE_SIZE', payload: pageSize })

const setBrandsPageNumber = (dispatch: Dispatch<Action>, pageNumber: number) =>
  dispatch({ type: 'SET_BRANDS_PAGE_NUMBER', payload: pageNumber })

const setPhonePageSize = (dispatch: Dispatch<Action>, pageSize: number) =>
  dispatch({ type: 'SET_PHONE_PAGE_SIZE', payload: pageSize })

const setPhonePageNumber = (dispatch: Dispatch<Action>, pageNumber: number) =>
  dispatch({ type: 'SET_PHONE_PAGE_NUMBER', payload: pageNumber })

const setUser = (dispatch: Dispatch<Action>, user: User | null) =>
  dispatch({ type: 'SET_USER', payload: user })

const setBrandSortMode = (dispatch: Dispatch<Action>, sortMode: string) =>
  dispatch({ type: 'SET_BRANDS_SORTING_MODE', payload: sortMode })

export {
  setBrandPageSize,
  setBrandSortMode,
  setBrandsPageNumber,
  setIsLoading,
  setPhonePageNumber,
  setPhonePageSize,
  setUser,
}
