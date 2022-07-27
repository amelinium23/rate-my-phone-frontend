import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PhoneItem } from '../components/PhoneItem'
import { Phone, PhoneResponse } from '../types/Device'

const getPhones = async (key?: string) => {
  const res = await axios.get(
    key !== '' && key !== undefined ? '/device/brand' : '/device',
    key !== '' && key !== undefined ? { params: { brand_key: key } } : {}
  )
  return res.data
}

export const PhonePage: FunctionComponent = () => {
  const [phones, setPhones] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const { key } = useParams()

  useEffect(() => {
    getPhones(key).then(setPhones).catch(setErrorMessage)
    toast
      .promise(getPhones(key), {
        error: errorMessage !== '' ? errorMessage : 'Unable to fetch!',
      })
      .then(() => {})
      .catch((err) => setErrorMessage(err.message))
  }, [])

  return (
    <Container className="mt-2">
      <h4 key="header-page-phone" className="text-center">
        Phones page
      </h4>
      {key !== '' && key !== undefined ? (
        <>
          <h5 className="text-left">
            {key.charAt(0).toLocaleUpperCase() + key.slice(1)}
          </h5>
          {phones.length === 0 ? (
            <h5 className="text-center">No phones found</h5>
          ) : (
            <Row>
              {phones.map((phone: Phone) => (
                <Col md={3} key={phone.id}>
                  <PhoneItem phone={phone} />
                </Col>
              ))}
            </Row>
          )}
        </>
      ) : (
        <>
          <Row>
            {phones.map((phone: PhoneResponse) =>
              phone.device_list.length === 0 ? null : (
                <>
                  <h5>{phone.brand_name}</h5>
                  {phone.device_list.map((device: Phone) => (
                    <Col key={device.id} md={3}>
                      <PhoneItem phone={device} key={device.device_name} />
                    </Col>
                  ))}
                </>
              )
            )}
          </Row>
        </>
      )}
    </Container>
  )
}
