import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'

import { Device, User } from '../../../types'
import { PhoneItem } from '../../items/PhoneItem'
import { PhoneAutoComplete } from '../../PhoneAutoComplete'

interface DeviceContainerProps {
  user?: User
}

export const DeviceContainer = ({ user }: DeviceContainerProps) => {
  if (!user) {
    return null
  }
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <section className="my-2">
      <h5 className="mt-2">Device you using</h5>
      {user?.device && (
        <Container className="p-0 my-2">
          <PhoneItem device={user?.device ?? {}} />
        </Container>
      )}
      {isEditing && (
        <Container className="p-0 my-2">
          <PhoneAutoComplete
            setIsEditing={setIsEditing}
            phone={user?.device ?? ({} as Device)}
          />
        </Container>
      )}
      {isEditing ? null : <Button onClick={handleEdit}>Edit Phone</Button>}
    </section>
  )
}
