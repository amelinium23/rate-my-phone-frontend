import { FunctionComponent } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Device } from '../../../types/Device'
import { useNavigate } from 'react-router-dom'
import './style.css'

interface DeviceItemProps {
  device: Device
  position: number
}

export const RecommendedDeviceItem: FunctionComponent<DeviceItemProps> = ({
  device,
  position,
}) => {
  const navigate = useNavigate()

  const containerStyle = {
    marginBottom: '1vh',
    border: '1px solid #bababa',
    borderRadius: '1.2vh',
  }

  const navigationState = {
    deviceName: device.device_name,
    deviceKey: device.key,
  }

  const handleNavigationToDetails = () => {
    navigate('details', { state: navigationState })
  }

  return (
    <Container
      className="d-flex justify-content-between py-1 recommended-item"
      style={containerStyle}
      onClick={handleNavigationToDetails}
    >
      <p className="float-start text-start mt-2 ">
        {position + 1}. {device.device_name}
      </p>
      <Image src={device.device_image} width={55} height={55} />
    </Container>
  )
}
