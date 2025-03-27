import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light py-5 mt-5">
      <Container>
        <Row className="mb-4">
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 className="fw-bold mb-4">MERN Blog</h5>
            <p className="text-muted">
              A platform for sharing thoughts, ideas, and experiences with the
              world. Join our community of writers and readers.
            </p>
          </Col>

          <Col lg={2} md={4} className="mb-4 mb-lg-0">
            <h6 className="fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">
                  Articles
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={4} className="mb-4 mb-lg-0">
            <h6 className="fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">
                  Guidelines
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-muted">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={4} md={4}>
            <h6 className="fw-bold mb-3">Subscribe to our newsletter</h6>
            <p className="text-muted mb-3">
              Get the latest articles and resources sent to your inbox.
            </p>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Your email"
                className="me-2"
              />
              <Button variant="dark">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col className="text-center text-muted">
            <p className="small mb-0">
              © {new Date().getFullYear()} MERN Blog. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
