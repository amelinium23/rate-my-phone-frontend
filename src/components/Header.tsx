import { Container, Image, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Login, User } from 'tabler-icons-react'

export const Header = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
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
          <Nav.Link>
            <Link to="/forum" className="me-auto nav-link">
              Forum
            </Link>
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="float-start justify-content-end">
          <NavDropdown title={<User size={30} color="#fff" />}>
            <NavDropdown.Item>
              <Login size={30} strokeWidth={1} color={'#4d1939'} /> Log in
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
