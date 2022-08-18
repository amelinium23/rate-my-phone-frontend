import axios from 'axios'
import { FunctionComponent, useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BrandItem } from '../components/Items/BrandItem'
import { Brand, BrandResponse } from '../types/Brand'
import autoAnimate from '@formkit/auto-animate'
import { toast } from 'react-toastify'
import { setIsLoading } from '../contexts/Actions'
import { PageSizePicker } from '../components/PageSizePicker'
import { useStore } from '../contexts/Store'
import { PaginationComponent } from '../components/PaginationComponent'

const getBrands = async (pageNumber: number, pageSize: number) => {
  const response = await axios.get('/brands', {
    params: { page_number: pageNumber, page_size: pageSize },
  })
  return response.data
}

export const BrandPage: FunctionComponent = () => {
  const { state, dispatch } = useStore()

  const [brandResponse, setBrandResponse] = useState<BrandResponse>({
    brands: [],
    total_pages: 1,
  } as BrandResponse)
  const parent = useRef(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(dispatch, true)
        const brands = await getBrands(state.pageNumber, state.pageSize)
        setBrandResponse(brands)
      } catch (err: any) {
        toast.error(err.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchBrands()
  }, [state.pageNumber, state.pageSize])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <Container className="my-2">
      <h5 className="text-center">Brands</h5>
      <Row>
        <Col md={3}>
          <p>Page size</p>
          <PageSizePicker />
        </Col>
      </Row>
      <Row ref={parent}>
        {brandResponse.brands.map((brand: Brand) =>
          brand.brand_name === '' ? null : (
            <Col key={brand.key} md={3}>
              <BrandItem brand={brand} />
            </Col>
          )
        )}
      </Row>
      <Row className="d-flex text-center">
        <PaginationComponent totalPages={brandResponse.total_pages} />
      </Row>
    </Container>
  )
}
