import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap'
import { ChangeEvent, FunctionComponent, useState } from 'react'
import { useLocation } from 'react-router-dom'

const backgroundImageUrl =
  'https://images.unsplash.com/photo-1523371683773-affcb4a2e39e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'

interface RegisterLocationState {
  login: string
  password: string
}

export const RegisterPage: FunctionComponent = () => {
  const { state } = useLocation()
  const { login, password } = state as RegisterLocationState
  const [email, setEmail] = useState<string>(login)
  const [registerPassword, setRegisterPassword] = useState<string>(password)
  const [displayName, setDisplayName] = useState<string>('')

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterPassword(e.target.value)
  }

  const onDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value)
  }

  return (
    <Container className="mt-2">
      <Row>
        <Col md={6} className="mt-2">
          <h5 className="text-center">Register</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={email}
                type="email"
                placeholder="Enter email"
                onChange={onEmailChange}
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                onChange={onPasswordChange}
                value={registerPassword}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={onDisplayNameChange}
                value={displayName}
                placeholder="Enter your nickname"
              />
            </Form.Group>
            <Button type="submit">Register</Button>
          </Form>
        </Col>
        <Col md={6} className="mt-2">
          <Image src={backgroundImageUrl} width={600} />
        </Col>
      </Row>
    </Container>
  )
}
