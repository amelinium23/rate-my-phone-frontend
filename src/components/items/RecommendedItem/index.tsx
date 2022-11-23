import './style.css'

import { Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { Device } from '../../../types'

interface DeviceItemProps {
  device: Device
  position: number
}

export const RecommendedDeviceItem = ({
  device,
  position,
}: DeviceItemProps) => {
  const navigate = useNavigate()

  const containerStyle = {
    marginBottom: '1vh',
    border: '1px solid #bababa',
    borderRadius: '1.2vh',
  }

  const handleNavigationToDetails = () => {
    navigate(`details/k/${device.key}/d/${device.device_name}`)
  }

  return (
    <Container
      className="d-flex justify-content-between py-1 recommended-item"
      style={containerStyle}
      onClick={handleNavigationToDetails}
    >
      <p className="float-start text-start mt-2 ">
        {device?.no || position + 1}. {device.device_name}
      </p>
      {device.device_image && (
        <Image src={device.device_image} width={60} height="50%" />
      )}
      {device?.daily_hits && (
        <p className="mt-2">Daily hits: {device?.daily_hits}</p>
      )}
    </Container>
  )
}
