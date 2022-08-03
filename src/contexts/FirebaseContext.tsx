import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, User } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const FirebaseContext = createContext<User | null>(null)

const useFirebaseAuth = () => useContext(FirebaseContext)
interface IProps {
  children: ReactNode
}

const FirebaseProvider: FunctionComponent<IProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setTimeout(() => auth.signOut(), 10800000)
    })
    return unsubscribe
  }, [])

  return (
    <FirebaseContext.Provider value={user}>{children}</FirebaseContext.Provider>
  )
}

export { useFirebaseAuth, FirebaseProvider }
