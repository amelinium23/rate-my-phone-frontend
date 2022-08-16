import axios from 'axios'
import { FunctionComponent, useState, useEffect, useRef, Dispatch } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BrandItem } from '../components/Items/BrandItem'
import { Brand } from '../types/Brand'
import autoAnimate from '@formkit/auto-animate'
import { toast } from 'react-toastify'
import { setIsLoading } from '../contexts/Actions'
import { ActionType } from '../contexts/types/StoreTypes'

interface BrandPageProps {
  dispatch: Dispatch<ActionType>
}

const getBrands = async () => {
  const response = await axios.get('/brands')
  return response.data
}

export const BrandPage: FunctionComponent<BrandPageProps> = ({ dispatch }) => {
  const [brands, setBrands] = useState([])
  const parent = useRef(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(dispatch, true)
        const brands = await getBrands()
        setBrands(brands)
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchBrands()
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
