import axios from 'axios'
import { User } from 'firebase/auth'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

interface EditProfileFormProps {
  user: User | null
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

export const EditProfileForm = ({
  user,
  setIsEditing,
}: EditProfileFormProps) => {
  if (!user) {
    return null
  }
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '')
  const [displayName, setDisplayName] = useState(user.displayName || '')
  const [photoUrl, setPhotoUrl] = useState(user.photoURL || '')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    axios
      .put('/user/', {
        uid: user.uid,
        display_name: displayName,
        phone_number: phoneNumber,
        photo_url: photoUrl,
      })
      .then((res) => {
        setIsEditing(false)
        setDisplayName('')
        setPhoneNumber('')
        setPhotoUrl('')
        toast.success(`Successfully updated user ${res.data.uid}`)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value)
  }

  const handlePhotoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoUrl(e.target.value)
  }

  return (
    <>
      <h5>Edit profile</h5>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mt-1">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </Form.Group>
        <Form.Group className="mt-1">
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your nickname"
            value={displayName}
            onChange={handleDisplayNameChange}
          />
        </Form.Group>
        <Form.Group className="mt-1">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your photo url"
            value={photoUrl}
            onChange={handlePhotoUrlChange}
          />
        </Form.Group>
        <Button className="my-2" type="submit">
          Edit profile
        </Button>
      </Form>
    </>
  )
}
