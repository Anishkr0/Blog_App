import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, isAuthenticated, error } = useContext(AuthContext);
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

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      setFormError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsSubmitting(true);
      await register({ name, email, password });
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
              Create Account
            </Card.Title>

            {formError && <Alert variant="danger">{formError}</Alert>}

            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </Form.Group>

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
                  placeholder="Enter password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
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
                {isSubmitting ? "Creating Account..." : "Register"}
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                Already have an account? <Link to="/login">Login</Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;
