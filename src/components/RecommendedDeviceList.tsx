import { FunctionComponent } from 'react'
import { Col } from 'react-bootstrap'

import { Device } from '../types/Device'
import { RecommendedDevices } from '../types/RecommendedDevice'
import { RecommendedDeviceItem } from './Items/RecommendedDeviceItem/RecommendedDeviceItem'

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
        <RecommendedDeviceItem
          key={device.key}
          device={device}
          position={index}
        />
      ))}
    </Col>
  )
}
