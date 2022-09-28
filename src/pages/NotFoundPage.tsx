import { FunctionComponent } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'

export const NotFoundPage: FunctionComponent = () => {
  const navigate = useNavigate()

  const onHomeClick = () => {
    navigate('/')
  }

  const containerStyle = { minHeight: '90vh' }

  return (
    <Container
      style={containerStyle}
      className="d-flex flex-column text-center justify-content-center align-items-center"
    >
      <h4>Page not found</h4>
      <Button variant="dark" onClick={onHomeClick}>
        Go to Home
      </Button>
    </Container>
  )
}
