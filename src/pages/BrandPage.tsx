import axios from 'axios'
import { FunctionComponent, useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BrandItem } from '../components/BrandItem'
import { Brand } from '../types/Brand'
import autoAnimate from '@formkit/auto-animate'
import { toast } from 'react-toastify'

const getBrands = async () => {
  const response = await axios.get('/brands')
  return response.data
}

export const BrandPage: FunctionComponent = () => {
  const [brands, setBrands] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const parent = useRef(null)

  useEffect(() => {
    getBrands()
      .then(setBrands)
      .catch((err) => setErrorMessage(err.message))
    toast
      .promise(getBrands(), {
        error: errorMessage !== '' ? errorMessage : 'Unable to fetch!',
      })
      .then(() => {})
      .catch((err) => setErrorMessage(err.message))
  }, [])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <Container className="my-2">
      <h5 className="text-center">Brands</h5>
      <Row ref={parent}>
        {brands.map((brand: Brand) =>
          brand.brand_name === '' ? null : (
            <Col key={brand.key} md={3}>
              <BrandItem brand={brand} />
            </Col>
          )
        )}
      </Row>
    </Container>
  )
}
