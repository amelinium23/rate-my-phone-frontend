import axios from 'axios'
import { sendEmailVerification } from 'firebase/auth'
import { FunctionComponent, useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { DeviceContainer } from '../../components/containers/'
import { EditProfileForm } from '../../components/forms'
import { setIsLoading, useStore } from '../../context'
import { User } from '../../types/User'
import { PHOTO_URL } from '../../utils/constants'

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
          toast.info(`Sent verification email to ${firebaseUser.email}`)
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
      } catch (error) {
        const er = error as Error
        toast.error(er.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchUser()
  }, [state.user])

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
              <p>Nickname: {firebaseUser?.displayName || 'not provided'}</p>
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
          <DeviceContainer user={user ? user : ({} as User)} />
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
