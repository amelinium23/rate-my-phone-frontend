import { Route, Routes } from 'react-router'
import { Header } from './components/Header'
import { BrandPage } from './pages/BrandPage'
import { ForumPage } from './pages/ForumPage'
import { HomePage } from './pages/HomePage'
import { PhonePage } from './pages/PhonePage'
import { Store, useStore } from './contexts/Store'
import { ToastContainer } from 'react-toastify'
import { DetailsPage } from './pages/DetailsPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { Loader } from './components/Loader'

export const App = () => {
  const { state, dispatch } = useStore()

  return (
    <>
      <Store>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<BrandPage dispatch={dispatch} />} />
          <Route path="/phones" element={<PhonePage />}>
            <Route key="phones-key-route" path=":key" element={<PhonePage />} />
          </Route>
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
      </Store>
    </>
  )
}
