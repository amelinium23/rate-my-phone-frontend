import axios from 'axios'
import { FunctionComponent, useEffect, useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PhoneItem } from '../components/Items/PhoneItem'
import { Phone, PhoneResponse } from '../types/Device'
import autoAnimate from '@formkit/auto-animate'
import { useStore } from '../contexts/Store'
import { setIsLoading } from '../contexts/Actions'

const getPhones = async (key?: string) => {
  const res = await axios.get(
    key !== '' && key !== undefined ? '/device/brand' : '/device',
    key !== '' && key !== undefined ? { params: { brand_key: key } } : {}
  )
  return res.data
}

export const PhonePage: FunctionComponent = () => {
  const { state, dispatch } = useStore()
  const { key } = useParams()
  const [phoneResponses, setPhoneResponses] = useState([])

  const parent = useRef(null)

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setIsLoading(dispatch, true)
        const res = await getPhones(key)
        setPhoneResponses(res)
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchPhones()
  }, [])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return state.isLoading ? null : (
    <Container ref={parent} className="mt-2">
      <h5 key="header-page-phone" className="text-center">
        Phones
      </h5>
      <Row>
        <Col md={3}></Col>
        <Col md={3}></Col>
      </Row>
      {key !== '' && key !== undefined ? (
        <div>
          <h5 className="text-left">
            {key.charAt(0).toLocaleUpperCase() + key.slice(1)}
          </h5>
          {phoneResponses.length === 0 ? (
            <h5 className="text-center">No phones found</h5>
          ) : (
            <Row>
              {phoneResponses.map((phone: Phone) => (
                <Col md={3} key={phone.key}>
                  <PhoneItem phone={phone} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      ) : (
        <Row>
          {phoneResponses.map((phoneResponse: PhoneResponse) =>
            phoneResponse.device_list.length === 0 ? null : (
              <>
                <h5>{phoneResponse.brand_name}</h5>
                {phoneResponse.device_list.map((phone: Phone) => (
                  <Col key={phone.id} md={3}>
                    <PhoneItem phone={phone} key={phone.device_name} />
                  </Col>
                ))}
              </>
            )
          )}
        </Row>
      )}
    </Container>
  )
}
