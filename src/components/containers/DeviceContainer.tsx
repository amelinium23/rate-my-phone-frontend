import { FunctionComponent, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

import { Device } from '../../types/Device'
import { User } from '../../types/User'
import { PhoneItem } from '../Items/PhoneItem'
import { PhoneAutoComplete } from '../PhoneAutoComplete'

interface DeviceContainerProps {
  user?: User
}

export const DeviceContainer: FunctionComponent<DeviceContainerProps> = ({
  user,
}) => {
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
