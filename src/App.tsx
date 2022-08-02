import { Route, Routes } from 'react-router'
import { Header } from './components/Header'
import { BrandPage } from './pages/BrandPage'
import { ForumPage } from './pages/ForumPage'
import { HomePage } from './pages/HomePage'
import { PhonePage } from './pages/PhonePage'
import { AppProvider, useStore } from './contexts/AppContext'
import { ToastContainer } from 'react-toastify'
import { DetailsPage } from './pages/DetailsPage'
import { Loader } from './components/Loader'
import { LoginPage } from './pages/LoginPage'
import { FirebaseProvider, useFirebaseAuth } from './contexts/FirebaseContext'

export const App = () => {
  const { state } = useStore()

  const auth = useFirebaseAuth()
  console.log(auth)

  return (
    <>
      <AppProvider>
        <FirebaseProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/brands" element={<BrandPage />} />
            <Route path="/phones" element={<PhonePage />}>
              <Route
                key="phones-key-route"
                path=":key"
                element={<PhonePage />}
              />
            </Route>
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <ToastContainer
            theme="dark"
            position="bottom-right"
            newestOnTop
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Loader isLoading={state.isLoading} />
        </FirebaseProvider>
      </AppProvider>
    </>
  )
}
