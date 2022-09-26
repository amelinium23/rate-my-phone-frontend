import axios from 'axios'
import { FunctionComponent, useState, useEffect } from 'react'
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  DeviceDetails,
  MoreSpecification,
  SpecificationDetails,
} from '../types/Device'
import { notUsedKeysDetailsPage } from '../utils/constants'
import '../css/DetailsPage.css'
import { PricesContainer } from '../components/containers/PricesContainer'
import { PhotosContainer } from '../components/containers/PhotosContainer'
import { setIsLoading } from '../contexts/Actions'
import { useStore } from '../contexts/Store'
import { Share } from 'tabler-icons-react'

const getDetails = async (key?: string) => {
  const response = await axios.get('/device/details', {
    params: { device_key: key },
  })
  return response.data
}

const upperFirstLetter = (brandName: string) =>
  brandName.charAt(0).toUpperCase() + brandName.slice(1)

export const DetailsPage: FunctionComponent = () => {
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails>(
    {} as DeviceDetails
  )
  const { state: storeState, dispatch } = useStore()
  const { deviceKey, deviceName } = useParams()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(dispatch, true)
        const details = await getDetails(deviceKey)
        setDeviceDetails(details)
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchDetails()
  }, [])

  const handleCopyingUrl = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL)
    toast.success('URL copied to clipboard!')
  }

  return storeState.isLoading ? null : (
    <Container className="my-2">
      <Container className="my-1 p-0">
        <h5 className="text-center">{deviceName}</h5>
        <Container className="justify-content-center d-flex">
          <Button variant="light" onClick={handleCopyingUrl}>
            <Share size={20} /> Share this phone
          </Button>
        </Container>
      </Container>
      <Row className="my-2">
        <Col md={8}>
          <Table hover bordered>
            <thead>
              <tr>
                <th>Specification</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {deviceDetails &&
                Object.entries(deviceDetails)
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
        {deviceDetails.device_image && deviceDetails.pictures && (
          <PhotosContainer
            device_image={deviceDetails.device_image}
            pictures={deviceDetails.pictures}
            deviceName={deviceName ? deviceName : ''}
          />
        )}
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
              {deviceDetails?.more_specification !== undefined &&
                deviceDetails?.more_specification !== null &&
                deviceDetails?.more_specification.map(
                  (spec: MoreSpecification) => (
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
                  )
                )}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <h5 className="text-center">Prices</h5>
          <PricesContainer prices={deviceDetails?.prices} />
        </Col>
      </Row>
    </Container>
  )
}
