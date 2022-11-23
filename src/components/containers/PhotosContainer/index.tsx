import { Carousel, Col, Image } from 'react-bootstrap'

interface PhotosContainerProps {
  pictures: string[]
}

export const PhotosContainer = ({ pictures }: PhotosContainerProps) => {
  if (!pictures) {
    return (
      <Col md={4} className="photoContainer">
        <p>No photos available 😥</p>
      </Col>
    )
  }

  return (
    <Col md={4} className="photoContainer">
      <Carousel
        wrap
        slide
        interval={10000}
        variant="dark"
        className="d-flex justify-content-center"
      >
        {pictures.map((photo) => (
          <Carousel.Item key={photo}>
            <Image fluid src={photo} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Col>
  )
}
