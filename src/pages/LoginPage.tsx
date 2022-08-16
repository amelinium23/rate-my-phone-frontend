import { Container, Col, Button, Form, Row } from 'react-bootstrap'
import { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react'
import { Login } from 'tabler-icons-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validatePassword, validateLogin } from '../utils/validators'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useStore } from '../contexts/Store'

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { state } = useStore()
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [registerLogin, setRegisterLogin] = useState<string>('')
  const [registerPassword, setRegisterPassword] = useState<string>('')

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    signInWithEmailAndPassword(state.auth, login, password)
      .then((user) => {
        console.debug('Logged in user: ', user)
        navigate('/', { replace: true })
      })
      .catch((err) => toast.error(err.message))
  }

  const onRegister = () =>
    navigate('/register', {
      state: { login: registerLogin, password: registerPassword },
    })

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleRegisterLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterLogin(e.target.value)
  }

  const handleRegisterPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterPassword(e.target.value)
  }

  return (
    <Container className="mt-3">
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <h5>Login</h5>
          <Form onSubmit={handleLogin}>
            <Form.Group className="my-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
                value={login}
                isValid={validateLogin(login)}
                isInvalid={!validateLogin(login)}
                onChange={handleLoginChange}
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter your password"
                value={password}
                isValid={validatePassword(password)}
                isInvalid={!validatePassword(password)}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Button
              disabled={!(validateLogin(login) && validatePassword(password))}
              type="submit"
              variant="success"
              onClick={handleLogin}
            >
              <Login size={28} strokeWidth={1} color="white" />
              Sign in
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h5>Register</h5>
          <Form>
            <Form.Group className="my-2" controlId="formRegisterEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={registerLogin}
                isValid={validateLogin(registerLogin)}
                isInvalid={!validateLogin(registerLogin)}
                onChange={handleRegisterLoginChange}
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="formRegisterPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={registerPassword}
                isValid={validatePassword(registerPassword)}
                isInvalid={!validatePassword(registerPassword)}
                onChange={handleRegisterPasswordChange}
              />
            </Form.Group>
          </Form>
          <Button
            disabled={
              !(
                validateLogin(registerLogin) &&
                validatePassword(registerPassword)
              )
            }
            onClick={onRegister}
          >
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
