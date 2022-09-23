import { useState, ChangeEvent, FunctionComponent } from 'react'
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
import { Login, User, Search, Logout, Article } from 'tabler-icons-react'
import { useStore } from '../contexts/Store'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { setUser } from '../contexts/Actions'

export const Header: FunctionComponent = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useStore()
  const [searchString, setSearchString] = useState<string>('')
  const user = state.auth.currentUser

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  const handleLoginNavigation = () => {
    navigate('/login', { replace: true })
  }

  const handleProfileNavigation = () => {
    navigate('/profile', { replace: true })
  }

  const handleLogout = async () => {
    if (user !== null) {
      await signOut(state.auth)
        .then(() =>
          toast.success(`${user.displayName || user.email} logged out`)
        )
        .catch((err) => toast.error(err.message))
      setUser(dispatch, null)
      navigate('/login', { replace: true })
    }
  }

  const handleSearchNavigation = () => {
    navigate(`/search/q/${searchString}`)
  }

  const handleSearchKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearchNavigation()
    }
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
              onKeyPress={handleSearchKeyPress}
            />
            <Button
              disabled={!searchString}
              variant="outline-default"
              onClick={handleSearchNavigation}
            >
              <Search size={30} color="#fff" strokeWidth={1} />
            </Button>
          </Form>
          <NavDropdown
            menuVariant="dark"
            align="end"
            title={<User size={30} color="#fff" strokeWidth={1} />}
          >
            {state.auth?.currentUser !== null ? (
              <>
                <NavDropdown.Item disabled>
                  {`Signed as ${
                    state.auth.currentUser?.displayName ||
                    state.auth.currentUser?.email
                  }`}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleProfileNavigation}>
                  <User size={20} color="white" strokeWidth={1} /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Article size={20} color="white" strokeWidth={1} /> Your posts
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <Logout size={20} strokeWidth={1} color="white" /> Logout
                </NavDropdown.Item>
              </>
            ) : (
              <NavDropdown.Item onClick={handleLoginNavigation}>
                <Login size={28} strokeWidth={1} color="white" /> Log in
              </NavDropdown.Item>
            )}
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
