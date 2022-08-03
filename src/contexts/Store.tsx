import {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  useContext,
  useReducer,
} from 'react'
import { AppStateType } from './types/StoreTypes'
import { appReducer } from './reducers/AppReducer'
import { FirebaseProvider } from './FirebaseContext'

const initialState: AppStateType = {
  pageNumber: 1,
  pageSize: 10,
  isLoading: false,
}

const AppContext = createContext<{
  state: AppStateType
  dispatch: Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const useStore = () => useContext(AppContext)

interface IProps {
  children: ReactNode
}

const Store: FunctionComponent<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <FirebaseProvider>
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider>
    </FirebaseProvider>
  )
}

export { useStore, Store }
