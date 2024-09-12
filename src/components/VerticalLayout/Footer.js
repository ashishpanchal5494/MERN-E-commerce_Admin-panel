import React from "react";
import { Row, Col, Container } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © Vishwakarma.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                Created <i className="mdi mdi-heart text-danger"></i> by Ashish
                Panchal
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
