import axios from 'axios'
import { FunctionComponent, useState, useEffect } from 'react'
import { Container, Table, Row, Col, Image, Card } from 'react-bootstrap'
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

  const containerStyle = {
    width: '16rem',
  }

  console.log(details)

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
        <Col md={3} className="mh-50">
          <Container className="d-flex justify-content-center">
            <Image src={details.device_image} />
          </Container>
          <Row className="mt-2">
            {details.pictures !== undefined
              ? details.pictures.map((picture) => (
                  <Col md={2} key={picture} className="m-3">
                    <Image src={picture} width={75} />
                  </Col>
                ))
              : null}
          </Row>
        </Col>
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
        <Col md={4}>
          <h5 className="text-center">Prices</h5>
          {details.prices !== undefined || details.prices === null ? (
            Object.entries(details.prices).map(([key, value]) => (
              <Row
                className="d-flex justify-content-center text-center"
                key={key}
              >
                <p className="text-left">{key}</p>
                {value !== undefined &&
                  value !== null &&
                  value.map((price: any) => (
                    <Card
                      className="my-1"
                      key={price.price}
                      style={containerStyle}
                    >
                      <a href={price.buy_url} target="blank">
                        <Card.Img
                          className="px-3 align-self-center"
                          variant="top"
                          src={price.shop_image}
                        />
                      </a>
                      <p className="p-0">{price.price}</p>
                    </Card>
                  ))}
              </Row>
            ))
          ) : (
            <Row className="mt-2">
              <p>No prices</p>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  )
}
