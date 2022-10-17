import './css/index.css'

import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { Header } from './components/Header'
import { Loader } from './components/Loader'
import { Store } from './context/Store'
import {
  BrandPage,
  ComparePage,
  DetailsPage,
  EditPostPage,
  ForumPage,
  HomePage,
  LoginPage,
  NewPostPage,
  NotFoundPage,
  PhonePage,
  PostPage,
  ProfilePage,
  RegisterPage,
  SearchResultPage,
  UserPostsPage,
} from './pages'

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
          <Route path="/my-posts" element={<UserPostsPage />} />
          <Route path="/edit-post/p/:id" element={<EditPostPage />} />
          <Route path="/compare" element={<ComparePage />} />
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
