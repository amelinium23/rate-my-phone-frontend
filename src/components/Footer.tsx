import { Anchor, Col, Container, Navbar, Row } from 'react-bootstrap'

export default function Footer() {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container style={{ color: 'gray', fontSize: '1.3vh' }}>
        <Row className="w-100 p-0">
          <Col sm={6}>
            <span>
              The site information is provided by{' '}
              <Anchor
                href="https://www.gsmarena.com/"
                style={{ color: 'gray' }}
              >
                GSM Arena
              </Anchor>
              .
            </span>
          </Col>
          <Col sm={6} className="text-end">
            <span>
              This site using this{' '}
              <Anchor
                href="https://github.com/kyawhtut-cu/gsm-arena-api"
                style={{ color: 'gray' }}
              >
                API
              </Anchor>{' '}
              by Kyaw Htut.
            </span>
          </Col>
        </Row>
      </Container>
    </Navbar>
  )
}
