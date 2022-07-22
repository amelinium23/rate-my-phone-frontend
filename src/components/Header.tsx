import { Container, Image, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { User } from 'tabler-icons-react'

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Image
              width={30}
              height={30}
              src="https://cdn-icons-png.flaticon.com/512/2971/2971416.png"
            />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/brands" className="me-auto nav-link">
              Brands
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/phones" className="me-auto nav-link">
              Phones
            </Link>
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <User width={30} height={30} color="#fff" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
