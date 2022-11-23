import './index.css'

import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Share } from 'tabler-icons-react'

import OpinionContainer from '../../components/containers/OpinionContainer'
import { PhotosContainer } from '../../components/containers/PhotosContainer'
import { PricesContainer } from '../../components/containers/PricesContainer'
import { AddOpinionForm } from '../../components/forms/AddOpinionForm'
import { setIsLoading, useStore } from '../../context'
import { getDetails } from '../../services'
import { getOpinions } from '../../services/OpinionService'
import {
  DeviceDetails,
  MoreSpecification,
  SpecificationDetails,
} from '../../types'
import { Opinion } from '../../types/Opinion'
import { notUsedKeysDetailsPage } from '../../utils/constants'

const upperFirstLetter = (brandName: string) =>
  brandName.charAt(0).toUpperCase() + brandName.slice(1)

export const DetailsPage = () => {
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails>(
    {} as DeviceDetails
  )
  const [opinions, setOpinions] = useState<Opinion[]>([])
  const [isAddingEnable, setIsAddingEnable] = useState<boolean>(false)
  const { state: storeState, dispatch } = useStore()
  const { deviceKey, deviceName } = useParams()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(dispatch, true)
        const details = await getDetails(deviceKey)
        setDeviceDetails(details)
      } catch (err) {
        const er = err as Error
        toast.error(er.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchDetails()
  }, [])

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        setIsLoading(dispatch, true)
        const res = await getOpinions(deviceKey ?? '')
        setOpinions(res)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchOpinions()
  }, [setIsAddingEnable])

  const handleCopyingUrl = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL)
    toast.success('URL copied to clipboard!')
  }

  const handleAddingOpinion = () => {
    setIsAddingEnable((prev) => !prev)
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
        {deviceDetails?.pictures && (
          <PhotosContainer pictures={deviceDetails.pictures} />
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
          {deviceDetails?.prices && (
            <PricesContainer prices={deviceDetails.prices} />
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md={8}>
          <h5>Opinions</h5>
        </Col>
        <Col md={4}>
          {storeState.auth?.currentUser && !isAddingEnable ? (
            <div className="d-flex justify-content-end">
              <Button onClick={handleAddingOpinion}>Add opinion</Button>
            </div>
          ) : null}
        </Col>
      </Row>
      {isAddingEnable ? (
        <Row>
          <AddOpinionForm
            setIsAddingEnable={setIsAddingEnable}
            deviceKey={deviceKey ?? ''}
          />
        </Row>
      ) : null}
      <Row className="mt-2">
        <OpinionContainer opinions={opinions} />
      </Row>
    </Container>
  )
}
