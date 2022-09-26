import { Card } from 'react-bootstrap'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Brand } from '../../types/Brand'

interface BrandItemProps {
  brand: Brand
}

export const BrandItem: FunctionComponent<BrandItemProps> = ({ brand }) => {
  return (
    <Card className="d-flex justify-content-center my-2 text-center">
      <p className="pt-3">
        <Link className="nav-link" to={`/phones/b/${brand.key}`}>
          {brand.brand_name}
        </Link>
      </p>
    </Card>
  )
}
