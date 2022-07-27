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

  console.log(details)

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
                      <td>
                        <strong>{upperFirstLetter(realKey)}</strong>
                      </td>
                      <td>{value !== '' ? value : '-'}</td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <Image src={details.device_image} />
          <Row className="mt-2">
            {details.pictures !== undefined
              ? details.pictures.map((picture) => (
                  <Col md={3} key={picture} className="mt-2">
                    <Image src={picture} width={100} />
                  </Col>
                ))
              : null}
          </Row>
        </Col>
      </Row>
      <Row className="mt-2">
        <h5>More specification</h5>
        <Col md={8}>
          <Table hover bordered>
            <thead>
              <tr>
                <th>Specification</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {details.more_specification !== undefined &&
                details.more_specification.map((spec: any) => (
                  <tr key={spec.title}>
                    <td>
                      <strong>{spec.title}:</strong>
                    </td>
                    <td>
                      {spec.data.length > 0
                        ? spec.data.map((data: any) => (
                            <p key={data.title} className="p-0">
                              <strong>{data.title}: </strong>
                              {data.data.length > 0 ? data.data : '-'}
                            </p>
                          ))
                        : '-'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4} className="mt-2">
          <h5>Prices</h5>
        </Col>
      </Row>
    </Container>
  )
}
