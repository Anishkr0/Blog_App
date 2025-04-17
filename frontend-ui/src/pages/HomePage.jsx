import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// Banner Component with Newsletter Subscription
const Banner = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you would handle the newsletter subscription
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <div className="py-5 mb-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={10} lg={8}>
            <h1 className="display-4 fw-bold mb-4">
              Inside Design: Stories and interviews Blogs
            </h1>
            <p className="lead text-muted mb-5">
              Subscribe to learn about new product features, the latest in
              technology, and updates.
            </p>

            <Form
              onSubmit={handleSubscribe}
              className="d-flex justify-content-center mb-5"
            >
              <Form.Group
                className="me-2 flex-grow-1"
                style={{ maxWidth: "400px" }}
              >
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="dark" type="submit">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ blog, large = false }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateContent = (content, length) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + "...";
  };

  return (
    <Card className="border-0 blog-card">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={blog.image || "https://via.placeholder.com/800x600"}
          alt={blog.title}
          className="img-fluid"
          style={{ height: large ? "350px" : "220px", objectFit: "cover" }}
        />
      </div>
      <Card.Body className="px-0 pt-3">
        <div className="d-flex align-items-center text-muted small mb-2">
          <span>{blog.author?.name || "Anonymous"}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        <Card.Title as={large ? "h4" : "h5"} className="mb-2">
          <Link
            to={`/blog/${blog._id}`}
            className="text-decoration-none text-dark stretched-link"
          >
            {blog.title}
          </Link>
        </Card.Title>
        <Card.Text className="text-muted">
          {truncateContent(blog.content, large ? 150 : 100)}
        </Card.Text>

        <div className="mt-3">
          {/* Tags/Categories would go here */}
          <span className="badge bg-light text-dark me-2">Design</span>
          <span className="badge bg-light text-dark me-2">Research</span>
        </div>
      </Card.Body>
    </Card>
  );
};

// No Blogs Component
const NoBlogs = () => {
  return (
    <Alert variant="info" className="text-center my-5">
      <Alert.Heading>No Blogs Available</Alert.Heading>
      <p>
        There are no blogs available at the moment. Be the first to create a
        blog!
      </p>
      <Link to="/create-blog">
        <Button variant="primary">Create Blog</Button>
      </Link>
    </Alert>
  );
};

// Main HomePage Component
const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogs(res.data.blogs);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blogs");
        setLoading(false);
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  // Get the recent blogs (only 2)
  const getRecentBlogs = () => {
    if (blogs.length === 0) return [];
    return blogs.slice(0, 2); // Get only the first 2 blogs
  };

  // Get the remaining blogs for "All blog posts" section
  const getRemainingBlogs = () => {
    if (blogs.length <= 2) return [];
    return blogs.slice(2); // Skip the first 2 blogs that are shown in recent
  };

  const recentBlogs = getRecentBlogs();
  const remainingBlogs = getRemainingBlogs();

  return (
    <>
      {/* Banner Section with Newsletter */}
      <Banner />

      {/* Blog Section */}
      <Container>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : blogs.length === 0 ? (
          <NoBlogs />
        ) : (
          <>
            {/* Recent Blog Posts - Only show 2 blogs */}
            <h2 className="mb-4">Recent blog posts</h2>
            <Row className="mb-5">
              {recentBlogs.length > 0 && (
                <Col md={7}>
                  <BlogCard blog={recentBlogs[0]} large={true} />
                </Col>
              )}

              {recentBlogs.length > 1 && (
                <Col md={5}>
                  <BlogCard blog={recentBlogs[1]} />
                </Col>
              )}
            </Row>

            {/* All Blog Posts Section */}
            {remainingBlogs.length > 0 && (
              <>
                <h2 className="mb-4 mt-5">All blog posts</h2>
                <Row xs={1} md={2} lg={3} className="g-4 mb-5">
                  {remainingBlogs.map((blog) => (
                    <Col key={blog._id}>
                      <BlogCard blog={blog} />
                    </Col>
                  ))}
                </Row>
              </>
            )}

            {isAuthenticated && (
              <div className="text-center my-5">
                <Link to="/create-blog">
                  <Button variant="outline-dark" size="lg">
                    Write New Blog
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
