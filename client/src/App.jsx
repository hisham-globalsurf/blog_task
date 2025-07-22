import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loadingUser } = useSelector((state) => state.auth);

  const fromAuth = location.state?.fromAuth;

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />

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

        <Route path="/blog/:id" element={ user ? <SingleBlogPage /> : <Login />} />

        <Route
          path="/dashboard"
          element={
            user ? (
              user.role === "admin" ? <Navigate to="/adminDashboard" /> : <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/adminDashboard"
          element={
            user ? (
              user.role === "admin" ? <AdminDashboard /> : <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
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
