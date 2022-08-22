import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { ActionType, AppContextType, AppStateType } from './types/StoreTypes'
import { appReducer } from './reducers/AppReducer'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { pageSizes } from '../utils/constants'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const initialState = {
  brandsPageNumber: 1,
  brandsPageSize: pageSizes[0],
  isLoading: false,
  auth: auth,
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      return setTimeout(() => auth.signOut(), 10800000)
    })
    return unsubscribe
  }, [])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { useStore, Store }
