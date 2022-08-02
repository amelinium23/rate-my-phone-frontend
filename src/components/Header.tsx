import { useState, ChangeEvent } from 'react'
import {
  Container,
  Image,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Login, User, Search } from 'tabler-icons-react'

export const Header = () => {
  const [searchString, setSearchString] = useState<string>('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

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
          <Link to="/brands" className="me-auto nav-link">
            Brands
          </Link>
          <Link to="/phones" className="me-auto nav-link">
            Phones
          </Link>
          <Link to="/forum" className="me-auto nav-link">
            Forum
          </Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Form className="d-flex">
            <Form.Control
              type="search"
              className="pt-0 pb-0"
              value={searchString}
              onChange={handleSearch}
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="outline-default">
              <Search size={30} color="#fff" strokeWidth={1} />
            </Button>
          </Form>
          <NavDropdown title={<User size={30} color="#fff" strokeWidth={1} />}>
            <NavDropdown.Item>
              <Link className="nav-link p-0" to="/login">
                <Login size={28} strokeWidth={1} color="#4d1939" />
                Log in
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
