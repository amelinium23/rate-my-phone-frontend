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
import { Link, useNavigate } from 'react-router-dom'
import { Login, User, Search } from 'tabler-icons-react'

export const Header = () => {
  const [searchString, setSearchString] = useState<string>('')
  const navigate = useNavigate()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  const handleLoginNavigation = () => {
    navigate('/login', { replace: true })
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
              placeholder="Search"
              className="pt-0 pb-0"
              value={searchString}
              onChange={handleSearch}
            />
            <Button variant="outline-default" onClick={() => {}}>
              <Search size={30} color="#fff" strokeWidth={1} />
            </Button>
          </Form>
          <NavDropdown
            menuVariant="dark"
            align="end"
            title={<User size={30} color="#fff" strokeWidth={1} />}
          >
            <NavDropdown.Item onClick={handleLoginNavigation}>
              <Login size={28} strokeWidth={1} color="white" />
              Log in
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
