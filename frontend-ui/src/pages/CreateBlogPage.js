import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { title, content, image } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post("/api/blogs", formData);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
      setIsSubmitting(false);
      console.error(err);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h1 className="mb-4 text-center">Create New Blog</h1>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-4" controlId="title">
                  <Form.Label className="fw-bold">Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter a compelling title"
                    value={title}
                    onChange={onChange}
                    className="py-2"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="image">
                  <Form.Label className="fw-bold">Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={onChange}
                    className="py-2"
                  />
                  <Form.Text className="text-muted">
                    Add a cover image to make your blog stand out. Leave empty
                    for a default image.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="content">
                  <Form.Label className="fw-bold">Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="content"
                    placeholder="Write your blog content here..."
                    value={content}
                    onChange={onChange}
                    rows={12}
                    className="py-2"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Categories</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Design"
                      name="categories"
                      type="checkbox"
                      id="design"
                    />
                    <Form.Check
                      inline
                      label="Research"
                      name="categories"
                      type="checkbox"
                      id="research"
                    />
                    <Form.Check
                      inline
                      label="Business"
                      name="categories"
                      type="checkbox"
                      id="business"
                    />
                    <Form.Check
                      inline
                      label="Technology"
                      name="categories"
                      type="checkbox"
                      id="technology"
                    />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-between mt-4">
                  <Button
                    variant="outline-secondary"
                    type="button"
                    className="px-4 rounded-pill"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="dark"
                    type="submit"
                    className="px-4 rounded-pill"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Publishing..." : "Publish Blog"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBlogPage;
