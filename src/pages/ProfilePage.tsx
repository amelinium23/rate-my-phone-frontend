import axios from 'axios'
import { FunctionComponent, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useStore } from '../contexts/Store'
import { setIsLoading } from '../contexts/Actions'

const PHOTO_URL =
  'https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png'

const getUserInfo = async (uid: string) => {
  const res = await axios.get('/user', { params: { uid: uid } })
  return res.data
}

export const ProfilePage: FunctionComponent = () => {
  const { state, dispatch } = useStore()
  const [user, setUser] = useState(null)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const firebaseUser = state.auth.currentUser

  const handleEditing = () => {
    setIsEditable(!isEditable)
  }

  console.log(user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (firebaseUser?.uid !== undefined) {
          setIsLoading(dispatch, true)
          const data = await getUserInfo(firebaseUser.uid)
          setUser(data)
        }
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchUser()
  }, [])

  return (
    <Container className="my-2">
      <Row>
        <Col md={6}>
          <h5>Hello, {firebaseUser?.displayName || firebaseUser?.email}</h5>
          <p>Email: {firebaseUser?.email}</p>
          <p>Phone number: {firebaseUser?.phoneNumber || 'Not provided'}</p>
          <p>Last login: {firebaseUser?.metadata.lastSignInTime}</p>
          <Button onClick={handleEditing}>Edit profile</Button>
        </Col>
        <Col md={6}>
          <h5 className="text-center">Profile picture</h5>
          <div className="d-flex justify-content-center">
            <Image
              className=""
              src={firebaseUser?.photoURL || PHOTO_URL}
              width="50%"
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
