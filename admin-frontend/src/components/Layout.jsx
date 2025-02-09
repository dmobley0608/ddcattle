import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, Outlet } from 'react-router';
import Sidebar from './Sidebar';




const Layout = () => {

    return (

        <Container fluid>
            <Row className="justify-content-start align-items-start mt-5" >
                <Col xs={12} md={3} lg={2} >
                    <Sidebar />
                </Col>
                <Col xs={12} md={9} lg={10}>
                   <Outlet/>
                </Col>
            </Row>
        </Container>

    );
};

export default Layout;