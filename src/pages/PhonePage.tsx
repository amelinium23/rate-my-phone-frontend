import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PhoneItem } from '../components/Items/PhoneItem'
import { Device, PhoneResponse } from '../types/Device'
import { useStore } from '../contexts/Store'
import {
  setIsLoading,
  setPhonePageNumber,
  setPhonePageSize,
} from '../contexts/Actions'
import { PageSizePicker } from '../components/PageSizePicker'
import { phonesPageSizes } from '../utils/constants'
import { PaginationComponent } from '../components/PaginationComponent'

const getPhones = async (
  pageSize: number,
  pageNumber: number,
  key?: string
) => {
  const res = await axios.get(
    key !== '' && key !== undefined ? '/device/brand' : '/device',
    key !== '' && key !== undefined
      ? {
          params: {
            brand_key: key,
          },
        }
      : { params: { page_size: pageSize, page_number: pageNumber } }
  )
  return res.data
}

export const PhonePage: FunctionComponent = () => {
  const { state, dispatch } = useStore()
  const { key } = useParams()
  const [phoneResponses, setPhoneResponses] = useState({
    total: 300,
    totalPhones: 1,
    data: [],
  })

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setIsLoading(dispatch, true)
        const res = await getPhones(
          state.phonePageSize,
          state.phonePageNumber,
          key
        )
        setPhoneResponses(res)
      } catch (error) {
        const er = error as Error
        toast.error(er.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchPhones()
  }, [state.phonePageSize, state.phonePageNumber])

  return state.isLoading ? null : (
    <Container className="mt-2">
      <h5 key="header-page-phone" className="text-center">
        Phones
      </h5>
      {key !== '' && key !== undefined ? (
        <div>
          <h5 className="text-left">
            {key.charAt(0).toLocaleUpperCase() + key.slice(1)}
          </h5>
          {phoneResponses?.data.length === 0 ? (
            <h5 className="text-center">No phones found</h5>
          ) : (
            <Row>
              {phoneResponses?.data.map((phone: Device) => (
                <Col md={3} key={phone.key}>
                  <PhoneItem device={phone} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      ) : (
        <div className="my-1">
          <Row>
            <Col md={3}>
              <p>Page size</p>
              <PageSizePicker
                pageSize={state.phonePageSize}
                pageSizes={phonesPageSizes}
                onPageSizeChange={setPhonePageSize}
              />
            </Col>
            <Col md={{ span: 3, offset: 6 }}>
              <p className="text-end">
                Total phones {phoneResponses.totalPhones}
              </p>
              <div className="float-end">
                <PaginationComponent
                  currentPage={state.phonePageNumber}
                  dataLength={phoneResponses.total}
                  onPageChange={setPhonePageNumber}
                  pageSize={state.phonePageSize}
                />
              </div>
            </Col>
          </Row>
          <Row>
            {phoneResponses?.data.map((phone: PhoneResponse) => (
              <>
                <h5>{phone.brand_name}</h5>
                {phone.device_list.length > 0 ? (
                  phone.device_list.map((phone: Device) => (
                    <Col md={3} key={phone.key}>
                      <PhoneItem device={phone} />
                    </Col>
                  ))
                ) : (
                  <h5 className="text-center">No phones found</h5>
                )}
              </>
            ))}
          </Row>
        </div>
      )}
    </Container>
  )
}
