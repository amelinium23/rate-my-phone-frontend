import { Card, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Device } from '../../types'

interface PhoneItemProps {
  device: Device
}

export const PhoneItem = ({ device }: PhoneItemProps) => {
  return (
    <Card className="d-flex container justify-content-center my-2 text-center p-1">
      <p className="pt-3">{device.device_name}</p>
      <Container className="p-0">
        <Link to={`/details/k/${device.key}/d/${device.device_name}`}>
          <Image src={device.device_image} width={100} />
        </Link>
      </Container>
    </Card>
  )
}
