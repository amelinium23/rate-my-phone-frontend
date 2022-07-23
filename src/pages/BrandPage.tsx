import axios from 'axios'
import { FunctionComponent, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BrandItem } from '../components/BrandItem'
import { Brand } from '../types/Brand'

const getBrands = async () => {
  const response = await axios.get('/brands')
  return response.data
}

export const BrandPage: FunctionComponent = () => {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    getBrands().then(setBrands)
  }, [])

  return (
    <Container className="my-2">
      <h5 className="text-center">Brands</h5>
      <Row>
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
