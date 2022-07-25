import { createContext, Dispatch, FC, useContext, useReducer } from 'react'
import { AppStateType } from './types/StoreTypes'
import { appReducer } from './reducers/AppReducer'

const initialState: AppStateType = {
  pageNumber: 1,
  pageSize: 10,
}

const AppContext = createContext<{
  state: AppStateType
  dispatch: Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const useStore = () => useContext(AppContext)

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { useStore, AppProvider }
