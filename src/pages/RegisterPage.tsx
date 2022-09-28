import axios from 'axios'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ChangeEvent, FunctionComponent, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useStore } from '../contexts/Store'

const backgroundImageUrl =
  'https://images.unsplash.com/photo-1523371683773-affcb4a2e39e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'

interface RegisterLocationState {
  login: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  display_name: string
  phone_number?: string
  photo_url?: string
}

const postRegister = async (
  email: string,
  password: string,
  nickname: string,
  phoneNumber: string,
  photoUrl: string
) => {
  let data: RegisterData = {
    email: email,
    password: password,
    display_name: nickname,
  }
  if (phoneNumber) {
    data = { ...data, phone_number: phoneNumber }
  }
  if (photoUrl) {
    data = { ...data, photo_url: photoUrl }
  }
  const res = await axios.post('/user/', data)
  return res.data
}

export const RegisterPage: FunctionComponent = () => {
  const { state } = useStore()
  const { state: locationState } = useLocation()
  const { login, password } = locationState as RegisterLocationState
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>(login)
  const [registerPassword, setRegisterPassword] = useState<string>(password)
  const [displayName, setDisplayName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [photoURL, setPhotoURL] = useState<string>('')

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await postRegister(
        email,
        registerPassword,
        displayName,
        phoneNumber,
        photoURL
      )
      toast.info(`Registered ${res.display_name}`)
      signInWithEmailAndPassword(state.auth, email, registerPassword)
        .then(() => navigate('/', { replace: true }))
        .catch((err) => {
          const er = err as Error
          toast.error(er.message)
        })
    } catch (e) {
      const er = e as Error
      toast.error(er.message)
    }
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onPhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  const onPhotoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoURL(e.target.value)
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
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                onChange={onPhoneNumberChange}
                value={phoneNumber}
                placeholder="Enter your phone number"
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Photo url</Form.Label>
              <Form.Control
                type="text"
                onChange={onPhotoUrlChange}
                value={photoURL}
                placeholder="Enter your photo url"
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
