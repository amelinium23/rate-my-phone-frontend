import { FunctionComponent } from 'react'
import { Row } from 'react-bootstrap'

import { PriceDetails } from '../../types'
import { PriceItem } from '../items/PriceItem'

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
      {!Object.entries(prices) ? (
        Object.entries(prices).map(([key, value]: [string, PriceDetails[]]) => (
          <Row className="d-flex justify-content-center text-center" key={key}>
            <p className="text-left">{key}</p>
            {value !== undefined &&
              value !== null &&
              value.map((price: PriceDetails) => (
                <PriceItem price={price} key={`${Math.random() * 100}`} />
              ))}
          </Row>
        ))
      ) : (
        <p className="text-center">No prices</p>
      )}
    </>
  )
}
