import { FunctionComponent } from 'react'
import { Container } from 'react-bootstrap'
import { useStore } from '../contexts/Store'

export const ProfilePage: FunctionComponent = () => {
  const { state } = useStore()
  const user = state.auth.currentUser

  return (
    <Container className="my-2">
      <h5>Hello, {user?.displayName || user?.email}</h5>
    </Container>
  )
}
