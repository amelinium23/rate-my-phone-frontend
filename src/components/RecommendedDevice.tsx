import { FunctionComponent } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Device } from '../types/Device'
import { Link } from 'react-router-dom'

interface DeviceItemProps {
  device: Device
  position: number
}

export const RecommendedDevice: FunctionComponent<DeviceItemProps> = ({
  device,
  position,
}) => {
  const containerStyle = {
    marginBottom: '1vh',
    border: '1px solid #bababa',
    borderRadius: '1.2vh',
  }

  const navigationState = {
    deviceName: device.device_name,
    deviceKey: device.key,
  }

  return (
    <Container
      className="d-flex justify-content-between py-1"
      style={containerStyle}
    >
      <p className="float-start text-start mt-2 ">
        {position + 1}. {device.device_name}
      </p>
      <Link to="/details" state={navigationState}>
        <Image src={device.device_image} width={55} height={55} />
      </Link>
    </Container>
  )
}
