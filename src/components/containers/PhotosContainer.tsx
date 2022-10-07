import { Col, Container, Image, Row } from 'react-bootstrap'

interface PhotosContainerProps {
  device_image: string
  pictures: string[]
  deviceName: string
}

export const PhotosContainer = ({
  device_image,
  pictures,
  deviceName,
}: PhotosContainerProps) => {
  if (!pictures || !device_image) {
    return (
      <Col md={4} className="photoContainer">
        <p>No photos of {deviceName}</p>
      </Col>
    )
  }

  return (
    <Col md={4} className="photoContainer">
      <Container className="d-flex justify-content-center">
        <Image src={device_image} />
      </Container>
      <Row className="mt-2">
        {pictures &&
          pictures.map((picture) => (
            <Col md={2} key={picture} className="m-3">
              <Image src={picture} width={75} />
            </Col>
          ))}
      </Row>
    </Col>
  )
}
