import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MainNavbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Rainbow gradient top line */}
      <div className="rainbow-top"></div>

      <Navbar bg="white" expand="lg" className="py-3 border-bottom">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            TechA
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="me-3">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/articles" className="me-3">
                Articles
              </Nav.Link>
              {isAuthenticated && (
                <Nav.Link as={Link} to="/create-blog" className="me-3">
                  Write
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/" className="me-3">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="me-3">
                Contact Uss
              </Nav.Link>
            </Nav>

            <Nav>
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/profile" className="me-3">
                    {user?.name}
                  </Nav.Link>
                  <Button
                    variant="outline-dark"
                    onClick={handleLogout}
                    className="rounded-pill px-4"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="me-3">
                    Login
                  </Nav.Link>
                  <Link to="/register">
                    <Button variant="dark" className="rounded-pill px-4">
                      Get started
                    </Button>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavbar;
