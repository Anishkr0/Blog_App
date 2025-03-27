import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data.blog);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog details");
        setLoading(false);
        console.error(err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        setDeleting(true);
        await axios.delete(`/api/blogs/${id}`);
        navigate("/");
      } catch (err) {
        setError("Failed to delete blog");
        setDeleting(false);
        console.error(err);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/">
          <Button variant="primary">Go Back</Button>
        </Link>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container className="my-5">
        <Alert variant="info">Blog not found</Alert>
        <Link to="/">
          <Button variant="primary">Go Back</Button>
        </Link>
      </Container>
    );
  }

  const isAuthor = user && blog.author && user._id === blog.author._id;

  return (
    <Container className="my-5 blog-detail">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          {/* Blog Header */}
          <div className="mb-4">
            <h1 className="display-5 fw-bold mb-3">{blog.title}</h1>

            <div className="d-flex align-items-center mb-4">
              <img
                src="https://via.placeholder.com/40"
                alt="Author"
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <div>
                <div className="fw-bold">
                  {blog.author?.name || "Anonymous"}
                </div>
                <div className="text-muted small">
                  {formatDate(blog.createdAt)} • 5 min read
                </div>
              </div>

              {isAuthor && (
                <div className="ms-auto">
                  <Link to={`/edit-blog/${blog._id}`} className="me-2">
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="rounded-pill"
                    >
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-pill"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-5">
            <img
              src={blog.image || "https://via.placeholder.com/1200x600"}
              alt={blog.title}
              className="img-fluid rounded"
              style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
            />
          </div>

          {/* Blog Content */}
          <div className="blog-content mb-5">
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="mb-5">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              Design
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              Research
            </Badge>
          </div>

          {/* Navigation */}
          <div className="d-flex justify-content-between mt-5 pt-4 border-top">
            <Link to="/">
              <Button variant="outline-dark" className="rounded-pill">
                &larr; Back to Home
              </Button>
            </Link>

            <div>
              <Button variant="outline-dark" className="rounded-pill me-2">
                Share
              </Button>
              <Button variant="dark" className="rounded-pill">
                Follow Author
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPage;
