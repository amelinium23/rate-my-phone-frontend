import { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'

import { ApiPhoneResponse, Device, PhoneResponse } from '../types'

interface AutoCompleteProps {
  devices: ApiPhoneResponse
  orderKey: string
  deviceIds: { [key: string]: string }
  setDeviceIds: (deviceIds: { [key: string]: string }) => void
  deviceId: string
}

export const AutoComplete = ({
  devices,
  orderKey,
  deviceIds,
  setDeviceIds,
  deviceId,
}: AutoCompleteProps) => {
  const starterDevice = devices.data
    .map((response) => response.device_list)
    .flat()
    .find((device) => device?.key === deviceId)
  const [device, setDevice] = useState<Device | null>(starterDevice ?? null)

  const handleSelectingDevice = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDeviceName = e.target.value
    const selectedDevice = devices.data
      .map((response) => response.device_list)
      .flat()
      .find((device) => device.device_name === selectedDeviceName)
    setDevice(selectedDevice ?? null)
    setDeviceIds({ ...deviceIds, [orderKey]: selectedDevice?.key ?? '' })
  }

  return (
    <Form.Group className="me-2">
      <Form.Label>Device</Form.Label>
      <Form.Select
        value={device?.device_name ?? ''}
        onChange={handleSelectingDevice}
      >
        {devices?.data.map(
          (item: PhoneResponse) =>
            item.device_list.length > 0 && (
              <optgroup key={item.brand_id} label={item.brand_name}>
                {item.device_list.map((device: Device) => (
                  <option key={device.device_id}>{device.device_name}</option>
                ))}
              </optgroup>
            )
        )}
      </Form.Select>
    </Form.Group>
  )
}
