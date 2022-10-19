import { Carousel, Col, Image } from 'react-bootstrap'

interface PhotosContainerProps {
  pictures: string[]
  deviceName: string
}

export const PhotosContainer = ({
  pictures,
  deviceName,
}: PhotosContainerProps) => {
  if (!pictures) {
    return (
      <Col md={4} className="photoContainer">
        <p>No photos of {deviceName}</p>
      </Col>
    )
  }

  return (
    <Col md={4} className="photoContainer">
      <Carousel
        slide
        interval={10000}
        variant="dark"
        className="d-flex justify-content-center h-100"
      >
        {pictures.map((photo) => (
          <Carousel.Item key={photo}>
            <Image fluid src={photo} className="h-100" />
          </Carousel.Item>
        ))}
      </Carousel>
    </Col>
  )
}
