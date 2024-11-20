import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <header>
      <Navbar
        className="py-3"
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand href="/">ShopEase</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <div className="d-flex align-items-center">
                  <Image
                    width={45}
                    height={45}
                    src={user.picture}
                    roundedCircle
                  />
                  <NavDropdown title={user.name} id="username">
                    <NavDropdown.Item disabled>{user.email}</NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <>
                  <Nav.Link onClick={() => loginWithRedirect()}>
                    <FaSignInAlt /> Sign Up / Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
