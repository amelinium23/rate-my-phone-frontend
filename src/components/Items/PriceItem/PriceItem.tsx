import { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'

import { PriceDetails } from '../../../types/Device'

interface PriceItemProps {
  price: PriceDetails
}

export const PriceItem: FunctionComponent<PriceItemProps> = ({ price }) => {
  const generateId = `${price.price}-${Math.round(Math.random() * 1000)}`

  return (
    <Card className="cardContainer my-1" key={generateId}>
      <a href={price.buy_url} target="blank">
        <Card.Img
          className="px-3 align-self-center"
          variant="top"
          src={price.shop_image}
        />
      </a>
      <p className="p-0">{price.price.replace(' ', '')}</p>
    </Card>
  )
}
