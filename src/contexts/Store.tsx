import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'

import {
  brandsPageSizes,
  phonesPageSizes,
  sortingModes,
} from '../utils/constants'
import { setUser } from './Actions'
import { appReducer } from './reducers/AppReducer'
import { Action, Context, State } from './types/StoreTypes'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const initialState = {
  phonePageNumber: 1,
  phonePageSize: phonesPageSizes[0],
  brandsPageNumber: 1,
  brandsPageSize: brandsPageSizes[0],
  brandsSortMode: sortingModes[0],
  isLoading: false,
  auth: auth,
  user: null,
}

const AppContext = createContext<Context>({
  state: initialState,
  dispatch: (action: Action) => appReducer(initialState, action),
})

const useStore = () => {
  const { state, dispatch } = useContext(AppContext)
  if (state === undefined || dispatch === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return { state, dispatch }
}

interface IProps {
  children: ReactNode
}

const Store: FunctionComponent<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState as State)
  const value = { state, dispatch }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const uid = user?.uid
      const getUserInfo = async (uid: string) => {
        const res = await axios.get('/user', { params: { uid: uid } })
        return res.data
      }
      if (uid !== undefined) {
        getUserInfo(uid)
          .then((data) => {
            setUser(dispatch, data)
          })
          .catch((err) => console.log(err))
      }
      return setTimeout(() => auth.signOut(), 10800000)
    })
    return unsubscribe
  }, [])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { Store, useStore }
