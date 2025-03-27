import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        const blog = res.data.blog;

        setFormData({
          title: blog.title,
          content: blog.content,
          image: blog.image,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog details");
        setLoading(false);
        console.error(err);
      }
    };

    fetchBlog();
  }, [id]);

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
      await axios.put(`/api/blogs/${id}`, formData);
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update blog");
      setIsSubmitting(false);
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4">
                Edit Blog
              </Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image URL (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={onChange}
                  />
                  <Form.Text className="text-muted">
                    Leave empty to use default placeholder image
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="content"
                    placeholder="Write your blog content here..."
                    value={content}
                    onChange={onChange}
                    rows={10}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Blog"}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate(`/blog/${id}`)}
                  >
                    Cancel
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

export default EditBlogPage;
