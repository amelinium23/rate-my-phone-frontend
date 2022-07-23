import { FunctionComponent } from 'react'
import { Col } from 'react-bootstrap'
import { RecommendedDevice } from '../types/RecommendedDevice'
import { Device } from '../types/Device'
import { DeviceItem } from './DeviceItem'

interface IProps {
  recommended: RecommendedDevice
}

export const RecommendedList: FunctionComponent<IProps> = ({ recommended }) => {
  return (
    <Col md={6} className="mt-2">
      <h5 className="text-center mt-2">{recommended.title}</h5>
      {recommended.data.map((device: Device, index: number) => (
        <DeviceItem key={device.key} device={device} index={index} />
      ))}
    </Col>
  )
}
