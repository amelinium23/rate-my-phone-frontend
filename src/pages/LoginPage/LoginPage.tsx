import axios from 'axios'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  validateEmail,
  validatePassword,
} from '../../components/forms/validators'
import { setUser, useStore } from '../../context'

const getUser = async (uid: string) => {
  const res = await axios.get(`/user`, { params: { uid: uid } })
  return res.data
}

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [registerLogin, setRegisterLogin] = useState<string>('')
  const [registerPassword, setRegisterPassword] = useState<string>('')
  const user = state.auth.currentUser

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    await signInWithEmailAndPassword(state.auth, login, password)
      .then(() => navigate('/', { replace: true }))
      .catch((err) => toast.error(err.message))
    if (user) {
      const bUser = await getUser(user.uid)
      setUser(dispatch, bUser)
    }
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
                isValid={validateEmail(login)}
                isInvalid={!validateEmail(login)}
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
              disabled={!(validateEmail(login) && validatePassword(password))}
              type="submit"
              variant="success"
              onClick={handleLogin}
            >
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
                isValid={validateEmail(registerLogin)}
                isInvalid={!validateEmail(registerLogin)}
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
                validateEmail(registerLogin) &&
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
