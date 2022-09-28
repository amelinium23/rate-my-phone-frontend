import { FunctionComponent } from 'react'
import { Card, Container, Image } from 'react-bootstrap'
import { Device } from '../../types/Device'
import { Link } from 'react-router-dom'

interface PhoneItemProps {
  device: Device
}

export const PhoneItem: FunctionComponent<PhoneItemProps> = ({ device }) => {
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
