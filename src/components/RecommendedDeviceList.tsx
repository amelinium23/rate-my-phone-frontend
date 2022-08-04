import { FunctionComponent } from 'react'
import { Col } from 'react-bootstrap'
import { RecommendedDevices } from '../types/RecommendedDevice'
import { Device } from '../types/Device'
import { RecommendedDevice } from './RecommendedDevice'

interface RecommendedDeviceListProps {
  recommended: RecommendedDevices
}

export const RecommendedDeviceList: FunctionComponent<
  RecommendedDeviceListProps
> = ({ recommended }) => {
  return (
    <Col md={6} className="mt-2">
      <h5 className="text-center mt-2">{recommended.title}</h5>
      {recommended.data.map((device: Device, index: number) => (
        <RecommendedDevice key={device.key} device={device} position={index} />
      ))}
    </Col>
  )
}
