import axios from 'axios'
import { FunctionComponent, useState, useEffect } from 'react'
import { Container, Table, Row, Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import {
  DeviceDetails,
  MoreSpecification,
  SpecificationDetails,
} from '../types/Device'
import { notUsedKeysDetailsPage } from '../utils/constants'
import '../css/DetailsPage.css'
import { PricesContainer } from '../components/PricesContainer'
import { PhotosContainer } from '../components/PhotosContainer'

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
              {details &&
                Object.entries(details)
                  .filter(
                    ([key, value]) =>
                      !notUsedKeysDetailsPage.includes(key) &&
                      value !== '' &&
                      value !== null
                  )
                  .map(([key, value]) => (
                    <tr key={key}>
                      <td>
                        <strong>
                          {upperFirstLetter(key.replace(/_/g, ' '))}
                        </strong>
                      </td>
                      <td>{value !== '' ? value : '-'}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Col>
        <PhotosContainer
          device_image={details.device_image}
          pictures={details.pictures}
          deviceName={deviceName}
        />
      </Row>
      <Row className="mt-2">
        <Col md={8}>
          <h5>More specification</h5>
          <Table hover bordered>
            <thead>
              <tr>
                <th>Specification</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {details?.more_specification !== undefined &&
                details?.more_specification !== null &&
                details?.more_specification.map((spec: MoreSpecification) => (
                  <tr key={spec.title}>
                    <td>
                      <strong>{spec.title}:</strong>
                    </td>
                    <td>
                      {spec.data.length > 0
                        ? spec.data.map((details: SpecificationDetails) => (
                            <p key={details.title} className="p-0">
                              <strong>{details.title}: </strong>
                              {details.data.length > 0 ? details.data : '-'}
                            </p>
                          ))
                        : '-'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <h5 className="text-center">Prices</h5>
          <PricesContainer prices={details?.prices} />
        </Col>
      </Row>
    </Container>
  )
}
