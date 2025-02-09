import { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import { FaHorse, FaInfoCircle, FaTools } from 'react-icons/fa';

function Layout({ children }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" expanded={expanded} onToggle={handleToggle}>
        <Container>
          <Navbar.Brand href="/">DD Cattle</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/horses" onClick={handleClose}>
                <FaHorse /> Horses
              </Nav.Link>
              <Nav.Link as={Link} to="/cattle" onClick={handleClose}>
                Cattle
              </Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={handleClose}>
                <FaInfoCircle /> About
              </Nav.Link>
              <Nav.Link as={Link} to="/fun-tools" onClick={handleClose}>
                <FaTools /> Tools (Brand Decoder)
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div onClick={handleClose} className={expanded ? 'overlay' : ''}>
        {children}
      </div>
    </>
  );
}

export default Layout;
