import { Route, Routes } from 'react-router'
import { Header } from './components/Header'
import { BrandPage } from './pages/BrandPage'
import { ForumPage } from './pages/ForumPage'
import { HomePage } from './pages/HomePage'
import { PhonePage } from './pages/PhonePage'

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<BrandPage />} />
        <Route path="/phones" element={<PhonePage />} />
        <Route path="/forum" element={<ForumPage />} />
      </Routes>
    </>
  )
}
