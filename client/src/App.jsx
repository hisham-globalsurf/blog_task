import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleBlogPage from "./pages/SingleBlogPage";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFoundPage from "./components/layout/NotFoundPage";
import { Toaster } from "./components/ui/sonner";
import ContactPage from "./pages/user/ContactPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loadingUser } = useSelector((state) => state.auth);

  const fromAuth = location.state?.fromAuth;

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto px-4">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact-us" element={<ContactPage />} />

        <Route
          path="/login"
          element={
            user && fromAuth ? (
              <Navigate to="/" replace />
            ) : user ? (
              <Navigate to={getDashboardRoute(user)} replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            user && fromAuth ? (
              <Navigate to="/" replace />
            ) : user ? (
              <Navigate to={getDashboardRoute(user)} replace />
            ) : (
              <Register />
            )
          }
        />

        <Route path="/blog/:id" element={<SingleBlogPage />} />

        <Route
          path="/dashboard"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/adminDashboard" />
              ) : (
                <Dashboard />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/adminDashboard"
          element={
            user ? (
              user.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

function getDashboardRoute(user) {
  return user.role === "admin" ? "/adminDashboard" : "/dashboard";
}
