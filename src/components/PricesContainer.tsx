import { FunctionComponent } from 'react'
import { Row, Card } from 'react-bootstrap'
import { PriceDetails } from '../types/Device'

interface PricesContainerProps {
  prices: object
}

export const PricesContainer: FunctionComponent<PricesContainerProps> = ({
  prices,
}) => {
  if (!prices) {
    return (
      <Row className="mt-2">
        <p>No prices</p>
      </Row>
    )
  }

  return (
    <>
      {Object.entries(prices).map(([key, value]: [string, PriceDetails[]]) => (
        <Row className="d-flex justify-content-center text-center" key={key}>
          <p className="text-left">{key}</p>
          {value !== undefined &&
            value !== null &&
            value.map((price: PriceDetails) => (
              <Card
                className="cardContainer my-1"
                key={`${key}-${price.price}-${Math.round(
                  Math.random() * 1000
                )}`}
              >
                <a href={price.buy_url} target="blank">
                  <Card.Img
                    className="px-3 align-self-center"
                    variant="top"
                    src={price.shop_image}
                  />
                </a>
                <p className="p-0">{price.price.replace(' ', '')}</p>
              </Card>
            ))}
        </Row>
      ))}
    </>
  )
}
