import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import './Layout.css';

function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="content-wrapper" style={{ paddingTop: '20px' }}>
        {children}
      </div>
      <footer className="bg-dark text-light py-4 mt-5">
        <Container>
          <div className="text-center">
            <p>© {new Date().getFullYear()} DD Cattle. All rights reserved.</p>
            <p className="small">
              <a href="/privacy" className="text-light me-3">Privacy Policy</a>
              <a href="/terms" className="text-light">Terms of Use</a>
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Layout;
