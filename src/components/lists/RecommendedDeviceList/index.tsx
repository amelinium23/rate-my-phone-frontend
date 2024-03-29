import { Col } from 'react-bootstrap'

import { Device, RecommendedDevices } from '../../../types'
import { RecommendedDeviceItem } from '../../items/RecommendedItem'

interface RecommendedDeviceListProps {
  recommended: RecommendedDevices
}

export const RecommendedDeviceList = ({
  recommended,
}: RecommendedDeviceListProps) => {
  return (
    <Col sm={3} className="mt-2">
      <h5 className="text-center mt-2">{recommended.title}</h5>
      {recommended.data.map((device: Device, index: number) => (
        <RecommendedDeviceItem
          key={device.key}
          device={device}
          position={index}
        />
      ))}
    </Col>
  )
}
