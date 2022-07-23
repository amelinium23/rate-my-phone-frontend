import { Card } from 'react-bootstrap'
import { FunctionComponent } from 'react'
import { Brand } from '../types/Brand'

interface IProps {
  brand: Brand
}

export const BrandItem: FunctionComponent<IProps> = ({ brand }) => {
  return (
    <Card className="my-2 text-center">
      <p>{brand.brand_name}</p>
    </Card>
  )
}
