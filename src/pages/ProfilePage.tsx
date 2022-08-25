import axios from 'axios'
import { FunctionComponent, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useStore } from '../contexts/Store'
import { setIsLoading } from '../contexts/Actions'
import { sendEmailVerification } from 'firebase/auth'
import { EditProfileForm } from '../components/forms/EditProfileForm'
import { User } from '../types/User'

const PHOTO_URL =
  'https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'

const getUserInfo = async (uid: string) => {
  const res = await axios.get('/user', { params: { uid: uid } })
  return res.data
}

export const ProfilePage: FunctionComponent = () => {
  const { state, dispatch } = useStore()
  const [user, setUser] = useState<User | null>(null)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const firebaseUser = state.auth.currentUser

  const handleEditing = () => {
    setIsEditable(!isEditable)
  }

  const handleVerifyEmail = () => {
    if (firebaseUser) {
      sendEmailVerification(firebaseUser)
        .then(() =>
          toast.info(`Sent verification email to ${firebaseUser?.email}`)
        )
        .catch((err) => toast.error(err.message))
    }
  }

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
          {isEditable ? (
            <>
              <EditProfileForm
                user={firebaseUser}
                setIsEditing={setIsEditable}
              />
            </>
          ) : (
            <>
              <h5>Hello, {firebaseUser?.displayName || 'stranger!'}</h5>
              <p>NickName: {firebaseUser?.displayName || 'not provided'}</p>
              <p>Email: {firebaseUser?.email || 'Not provided'}</p>
              <p>
                Is email verified:{' '}
                {firebaseUser?.emailVerified.toString() || false.toString()}
              </p>
              <p>Phone number: {firebaseUser?.phoneNumber || 'Not provided'}</p>
              <p>Last login: {firebaseUser?.metadata.lastSignInTime}</p>
              <Button onClick={handleEditing}>Edit profile</Button>
            </>
          )}
          {!firebaseUser?.emailVerified && (
            <Button className="mx-1" onClick={handleVerifyEmail}>
              Verify email
            </Button>
          )}
          <div className="mt-2" style={{ borderTop: '0.3px solid lightgray' }}>
            <h5 className="mt-2">Device you using</h5>
            {!user?.device && <Button>Edit Phone</Button>}
          </div>
        </Col>
        <Col md={6}>
          <h5 className="text-center">Profile picture</h5>
          <div className="d-flex justify-content-center">
            <Image
              roundedCircle
              src={firebaseUser?.photoURL || PHOTO_URL}
              width="50%"
              height="50%"
            />
          </div>
        </Col>
      </Row>
    </Container>
  )
}
