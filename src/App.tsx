import { Route, Routes } from 'react-router'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands" element={<HomePage />} />
        <Route path="/phones" element={<HomePage />} />
      </Routes>
    </>
  )
}
