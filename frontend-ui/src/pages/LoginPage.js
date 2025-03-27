import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Set form error if auth error exists
    if (error) {
      setFormError(error);
      setIsSubmitting(false);
    }
  }, [error]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(formData);
      // Redirect will happen in useEffect
    } catch (err) {
      setIsSubmitting(false);
      // Error will be handled in useEffect
    }
  };

  return (
    <Row className="justify-content-center my-5">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title as="h2" className="text-center mb-4">
              Sign In
            </Card.Title>

            {formError && <Alert variant="danger">{formError}</Alert>}

            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customer? <Link to="/register">Register here</Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
