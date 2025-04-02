import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/footer";

// Pages link with eachother
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
// import About from "./pages/About";
import ArticlePage from "./pages/Articles";

// Protected route
import PrivateRoute from "./components/auth/PrivateRoute";

// Bootstrap linking 
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="py-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/articles" element={<ArticlePage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create-blog" element={<CreateBlogPage />} />
              <Route path="/edit-blog/:id" element={<EditBlogPage />} />
            </Route>
            <Route path="/Abouts" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
