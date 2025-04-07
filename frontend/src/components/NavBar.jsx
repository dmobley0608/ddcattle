import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';
import { FaHorse, FaInfoCircle, FaTools, FaHome } from 'react-icons/fa';
import {GiCow} from 'react-icons/gi';
import logo from '../assets/ddcc.png'; // Assuming you have a logo - replace with appropriate path

function NavBar() {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    const handleToggle = () => setExpanded(!expanded);
    const handleClose = () => setExpanded(false);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                fixed="top"
                expanded={expanded}
                onToggle={handleToggle}
                className="py-2 shadow"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" onClick={handleClose}>
                        {/* If you have a logo, uncomment this */}
                        {/* <img
              src={logo}
              height="30"
              className="d-inline-block align-top me-2"
              alt="DD Cattle Logo"
            /> */}
                        <span className="fw-bold">DD Cattle</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                as={Link}
                                to="/"
                                onClick={handleClose}
                                active={isActive('/')}
                            >
                                <FaHome className="me-1" /> Home
                            </Nav.Link>

                            <NavDropdown title={<><FaHorse className="me-1" /> Livestock</>} id="livestock-dropdown">
                                <NavDropdown.Item
                                    as={Link}
                                    to="/horses"
                                    onClick={handleClose}
                                    active={isActive('/horses')}
                                >
                                    <FaHorse className="me-1" /> Horses
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={Link}
                                    to="/cattle"
                                    onClick={handleClose}
                                    active={isActive('/cattle')}
                                >
                                    <GiCow className="me-1" /> Cattle
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link
                                as={Link}
                                to="/fun-tools"
                                onClick={handleClose}
                                active={isActive('/fun-tools')}
                            >
                                <FaTools className="me-1" /> Tools
                            </Nav.Link>

                            <Nav.Link
                                as={Link}
                                to="/about"
                                onClick={handleClose}
                                active={isActive('/about')}
                            >
                                <FaInfoCircle className="me-1" /> About
                            </Nav.Link>
                        </Nav>

                        <Nav>
                            <Button
                                variant="outline-light"
                                size="sm"
                                as={Link}
                                to="/contact"
                                onClick={handleClose}
                                className="my-2 my-lg-0"
                            >
                                Contact Us
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {expanded && <div className="overlay" onClick={handleClose}></div>}
        </>
    );
}

export default NavBar;
