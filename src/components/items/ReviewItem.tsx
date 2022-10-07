import { Card } from 'react-bootstrap'

import { Review } from '../../types'

interface ReviewItemProps {
  review: Review
}

export const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <Card className="d-flex justify-content-center my-2">
      <Card.Header>
        <Card.Title>{review.review_title}</Card.Title>
      </Card.Header>
      <a href={review.review_url} target="blank">
        <Card.Img src={review.review_image} alt={review.review_title} />
      </a>
    </Card>
  )
}
