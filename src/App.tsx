import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header } from './components/Header'
import { Loader } from './components/Loader/Loader'
import { Store } from './contexts/Store'
import { BrandPage } from './pages/BrandPage'
import { DetailsPage } from './pages/DetailsPage'
import { ForumPage } from './pages/ForumPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NewPostPage } from './pages/NewPostPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PhonePage } from './pages/PhonePage'
import { PostPage } from './pages/PostPage'
import { ProfilePage } from './pages/ProfilePage'
import { RegisterPage } from './pages/RegisterPage'
import { SearchResultPage } from './pages/SearchResultPage'

export const App = () => {
  return (
    <>
      <Store>
        <Header />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/phones" element={<PhonePage />}>
            <Route
              key="phones-key-route"
              path="b/:key"
              element={<PhonePage />}
            />
          </Route>
          <Route
            path="/details/k/:deviceKey/d/:deviceName"
            element={<DetailsPage />}
          />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/new-post" element={<NewPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search/q/:query" element={<SearchResultPage />} />
          <Route path="/post/p/:id" element={<PostPage />} />
        </Routes>
        <ToastContainer
          limit={3}
          theme="dark"
          position="bottom-right"
          newestOnTop
          draggable
        />
        <Loader />
      </Store>
    </>
  )
}
