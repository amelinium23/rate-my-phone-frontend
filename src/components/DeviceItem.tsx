import { FunctionComponent } from 'react'
import { Container, Image } from 'react-bootstrap'
import { Device } from '../types/Device'

interface IProps {
  device: Device
  index: number
}

export const DeviceItem: FunctionComponent<IProps> = ({ device, index }) => {
  const containerStyle = {
    marginBottom: '1vh',
    border: '1px solid #bababa',
    borderRadius: '1.2vh',
  }

  return (
    <Container
      className="d-flex justify-content-between py-1"
      key={device.key}
      style={containerStyle}
    >
      <p className="float-start text-start mt-2 ">
        {index + 1}. {device.device_name}
      </p>
      <Image src={device.device_image} width={55} height={55} />
    </Container>
  )
}
