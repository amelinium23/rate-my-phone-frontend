import { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'
import { User } from '../../types/User'

interface DeviceContainerProps {
  user?: User
}

export const DeviceContainer: FunctionComponent<DeviceContainerProps> = ({
  user,
}) => {
  if (!user) {
    return null
  }

  return (
    <section className="my-2">
      <h5 className="mt-2">Device you using</h5>
      {!user?.device && <Button>Edit Phone</Button>}
    </section>
  )
}
