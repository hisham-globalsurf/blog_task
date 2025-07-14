import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="w-full p-4 flex justify-between items-center border-b shadow">
      <Link to="/" className="text-xl font-bold">Blog App</Link>
      {user ? (
        <div className="flex gap-4 items-center">
          <span>Welcome, {user.name}</span>
          <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="text-blue-500">Login</Link>
          <Link to="/register" className="text-blue-500">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
