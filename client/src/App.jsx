import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleBlogPage from "./pages/SingleBlogPage";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/sonner";
import NotFoundPage from "./components/layout/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Toaster />

      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthRedirect user={user}>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect user={user}>
              <Register />
            </AuthRedirect>
          }
        />
        <Route path="/blog/:id" element={<SingleBlogPage />} />
        <Route
          path="/dashboard"
          element={
            <AuthRoute user={user}>
              <Dashboard />
            </AuthRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

function AuthRedirect({ user, children }) {
  return user ? <Navigate to="/" replace /> : children;
}

function AuthRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}
