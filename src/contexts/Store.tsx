import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useReducer,
} from 'react'
import { ActionType, AppContextType, AppStateType } from './types/StoreTypes'
import { appReducer } from './reducers/AppReducer'
import { FirebaseProvider } from './FirebaseContext'

const initialState = {
  pageNumber: 1,
  pageSize: 10,
  isLoading: false,
}

const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: (action: ActionType) => appReducer(initialState, action),
})

const useStore = () => useContext(AppContext)

interface IProps {
  children: ReactNode
}

const Store: FunctionComponent<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState as AppStateType)
  const value = { state, dispatch }

  return (
    <FirebaseProvider>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </FirebaseProvider>
  )
}

export { useStore, Store }
