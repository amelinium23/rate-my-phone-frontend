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
import 'react-toastify/dist/ReactToastify.min.css'

export const App = () => {
  const { state } = useStore()

  return (
    <>
      <AppProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/phones" element={<PhonePage />}>
            <Route path=":key" element={<PhonePage />} />
          </Route>
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/forum" element={<ForumPage />} />
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
      </AppProvider>
    </>
  )
}
