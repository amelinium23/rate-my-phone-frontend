import { Card, Col, Image, Row } from 'react-bootstrap'

import { Opinion } from '../../types'
import { PHOTO_URL } from '../../utils/constants'

interface OpinionItemProps {
  opinion: Opinion
}

export default function OpinionItem({ opinion }: OpinionItemProps) {
  return (
    <Card className="my-1">
      <Row className="p-0 my-1 ">
        <Col sm={2} className="my-1 text-center">
          <div>
            <Image
              src={opinion.user.photo_url || PHOTO_URL}
              roundedCircle
              width="50%"
            />
          </div>
          <p style={{ fontSize: '13px' }}>
            Created by {opinion.user.display_name}
          </p>
        </Col>
        <Col className="my-1" sm={10}>
          <h5>{opinion.title}</h5>
          <span>{opinion.description}</span>
        </Col>
      </Row>
    </Card>
  )
}
