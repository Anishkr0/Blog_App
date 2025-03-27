import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Tab,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs/user");
        setUserBlogs(res.data.blogs);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch your blogs");
        setLoading(false);
        console.error(err);
      }
    };

    fetchUserBlogs();
  }, []);

  // Blog Card Component
  const BlogCard = ({ blog }) => {
    return (
      <Card className="mb-3 shadow-sm">
        <Row className="g-0">
          <Col md={4}>
            <Card.Img
              src={blog.image || "https://via.placeholder.com/800x400"}
              alt={blog.title}
              className="img-fluid rounded-start h-100"
              style={{ objectFit: "cover" }}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>
                {blog.content.length > 100
                  ? `${blog.content.substring(0, 100)}...`
                  : blog.content}
              </Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </small>
                <div>
                  <Link to={`/blog/${blog._id}`} className="me-2">
                    <Button variant="outline-primary" size="sm">
                      View
                    </Button>
                  </Link>
                  <Link to={`/edit-blog/${blog._id}`} className="me-2">
                    <Button variant="outline-success" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <Container className="py-5">
      <Row>
        <Col lg={3}>
          <Card className="shadow-sm mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              <h4>{user.name}</h4>
              <p className="text-muted">{user.email}</p>
              <div className="mb-2">
                <Link to="/create-blog">
                  <Button variant="primary" className="w-100">
                    Create New Blog
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <h5>Account Details</h5>
              <hr />
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Blogs:</strong> {userBlogs.length}
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <Tab.Container id="profile-tabs" defaultActiveKey="blogs">
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="blogs">My Blogs</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="settings">Account Settings</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="blogs">
                    <h4 className="mb-3">My Blogs</h4>

                    {loading ? (
                      <div className="text-center my-5">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : error ? (
                      <Alert variant="danger">{error}</Alert>
                    ) : userBlogs.length === 0 ? (
                      <Alert variant="info">
                        You haven't created any blogs yet.
                        <Link to="/create-blog" className="alert-link">
                          {" "}
                          Create your first blog!
                        </Link>
                      </Alert>
                    ) : (
                      <div>
                        {userBlogs.map((blog) => (
                          <BlogCard key={blog._id} blog={blog} />
                        ))}
                      </div>
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="settings">
                    <h4 className="mb-3">Account Settings</h4>
                    <p>
                      Account settings functionality will be implemented in the
                      future.
                    </p>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
