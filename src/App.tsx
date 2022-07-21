import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router'

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Container></Container>} />
      </Routes>
    </>
  )
}
