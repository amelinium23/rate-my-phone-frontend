import axios from 'axios'
import { FunctionComponent, useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BrandItem } from '../components/Items/BrandItem'
import { Brand, BrandResponse } from '../types/Brand'
import autoAnimate from '@formkit/auto-animate'
import { toast } from 'react-toastify'
import {
  setIsLoading,
  setBrandsPageNumber,
  setBrandPageSize,
} from '../contexts/Actions'
import { brandsPageSizes, sortingModes } from '../utils/constants'
import { PageSizePicker } from '../components/PageSizePicker'
import { useStore } from '../contexts/Store'
import { PaginationComponent } from '../components/PaginationComponent'
import { SortModeSelect } from '../components/SortModeSelect'

const getBrands = async (pageNumber: number, pageSize: number) => {
  const response = await axios.get('/brands', {
    params: { page_number: pageNumber, page_size: pageSize },
  })
  return response.data
}

export const BrandPage: FunctionComponent = () => {
  const { state, dispatch } = useStore()
  const [brandResponse, setBrandResponse] = useState<BrandResponse | null>(null)
  const parent = useRef(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(dispatch, true)
        const brands: BrandResponse = await getBrands(
          state.brandsPageNumber,
          state.brandsPageSize
        )
        if (
          state.brandsPageNumber >
          brands.total_pages / state.brandsPageSize
        ) {
          setBrandsPageNumber(dispatch, 1)
        }
        setBrandResponse(brands)
      } catch (err) {
        const er = err as Error
        toast.error(er.message)
      } finally {
        setIsLoading(dispatch, false)
      }
    }
    fetchBrands()
  }, [state.brandsPageNumber, state.brandsPageSize])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return state.isLoading ? null : (
    <Container className="my-2">
      <h5 className="text-center">Brands</h5>
      <Row>
        <Col md={3}>
          <p>Page size</p>
          <PageSizePicker
            pageSizes={brandsPageSizes}
            pageSize={state.brandsPageSize}
            onPageSizeChange={setBrandPageSize}
          />
        </Col>
        <Col md={3}>
          <p>Sorting mode</p>
          <SortModeSelect sortModes={sortingModes} />
        </Col>
        <Col md={6}>
          <p className="text-end">Total brands: {brandResponse?.total_pages}</p>
          <div className="float-end">
            <PaginationComponent
              onPageChange={setBrandsPageNumber}
              pageSize={state.brandsPageSize}
              currentPage={state.brandsPageNumber}
              dataLength={brandResponse?.total_pages || 1}
            />
          </div>
        </Col>
      </Row>
      <Row ref={parent}>
        {brandResponse?.brands.map((brand: Brand) =>
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
