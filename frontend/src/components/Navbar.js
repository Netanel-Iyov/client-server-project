import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import { isLoggedIn } from "../components/utils";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('stock_site_token');

    // Optionally: Implement any other logout logic here

    // Redirect to the login page after logging out
    navigate("/sign-in");
  };

  const loggedIn = isLoggedIn(); // Determine if the user is logged in

  return (
    <BootstrapNavbar bg="light" expand="lg" className="mb-4">
      <Container className="mt-1 p-1">
        <BootstrapNavbar.Brand href="/dashboard">
          Crypto Site
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {loggedIn ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Home Page
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link as={Link} to="/contact-us">
                  Contact Us
                </Nav.Link>

              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/sign-in">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/sign-up">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/contact-us">
                  Contact Us
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
