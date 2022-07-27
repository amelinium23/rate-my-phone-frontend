import axios from 'axios'
import { FunctionComponent, useState, useEffect } from 'react'
import { Container, Table, Row, Col, Image } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { DeviceDetails } from '../types/Device'

const notUsedKeys = [
  'pictures',
  'more_specification',
  'key',
  'prices',
  'more_information',
  'device_image',
]

interface LocationState {
  deviceName: string
  deviceKey: string
}

const getDetails = async (key?: string) => {
  const response = await axios.get('/device/details', {
    params: { device_key: key },
  })
  return response.data
}

const upperFirstLetter = (brandName: string) =>
  brandName.charAt(0).toUpperCase() + brandName.slice(1)

export const DetailsPage: FunctionComponent = () => {
  const [details, setDetails] = useState<DeviceDetails>({} as DeviceDetails)
  const { state } = useLocation()
  const { deviceName, deviceKey } = state as LocationState
  const brandName = upperFirstLetter(deviceKey.split('_')[0])

  useEffect(() => {
    getDetails(deviceKey).then(setDetails).catch(console.error)
  }, [])

  return (
    <Container className="mt-2">
      <h5>
        {brandName} {deviceName}
      </h5>
      <Row className="mt-2">
        <Col md={8}>
          <Table hover bordered>
            <thead>
              <tr>
                <th>Specification</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(details)
                .filter(
                  ([key, value]) =>
                    !notUsedKeys.includes(key) && value !== '' && value !== null
                )
                .map(([key, value]) => {
                  const realKey = key.replace(/_/g, ' ')

                  return (
                    <tr key={key}>
                      <td>{upperFirstLetter(realKey)}</td>
                      <td>{value !== '' ? value : '-'}</td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </Col>
        <Col md={4} className="flex justify-content-center">
          <Image src={details.device_image} width={200} />
        </Col>
      </Row>
    </Container>
  )
}
