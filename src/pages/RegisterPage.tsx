import { Container, Form, Button } from 'react-bootstrap'
import { ChangeEvent, FunctionComponent, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface RegisterLocationState {
  login: string
  password: string
}

export const RegisterPage: FunctionComponent = () => {
  const { state } = useLocation()
  const { login, password } = state as RegisterLocationState
  const [email, setEmail] = useState<string>(login)
  const [registerPassword, setRegisterPassword] = useState<string>(password)

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterPassword(e.target.value)
  }

  return (
    <Container className="mt-2">
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
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  )
}
