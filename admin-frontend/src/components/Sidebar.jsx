import { useState } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import React from 'react';
import { useLazyGetProfileQuery, useSignoutMutation } from '../slices/apiSlice';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

export default function Sidebar() {
  const [trigger]= useSignoutMutation()
  const [fetchUser] = useLazyGetProfileQuery()
  const nav =useNavigate()
  const dispatch = useDispatch()
  const signout = async () => {
    await trigger()
    dispatch(logout())
  }
  return (
    <Navbar bg="light" expand="lg" className="flex-column">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link href="/qwerty/dashboard">Dashboard</Nav.Link>
            <Nav.Link href='/qwerty/horses'>Horses</Nav.Link>
            <Nav.Link href='/qwerty/medical-records'>Medical Records</Nav.Link>
            <Nav.Link onClick={()=>{signout()}}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



