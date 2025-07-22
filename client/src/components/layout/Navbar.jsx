import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, User } from "lucide-react";
import { logout } from "@/features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, loadingUser } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const isOnDashboard =
    location.pathname === "/dashboard" ||
    location.pathname === "/adminDashboard";
  const navLabel = isOnDashboard ? "Home" : "Dashboard";

  const handleDashboardClick = () => {
    if (loadingUser || !user) return;

    if (isOnDashboard) {
      navigate("/");
    } else if (user.role === "admin") {
      navigate("/adminDashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-sky-400 via-cyan-500 to-indigo-600 text-white border-b border-white/50 px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <div onClick={() => navigate("/")}>
        <h1 className="text-xl font-bold text-white/80 tracking-tight">
          Bloggy
        </h1>
      </div>

      {/* Profile Dropdown */}
      <div className="flex justify-center items-center gap-4 md:gap-10 cursor-pointer">
        <h1
          onClick={handleDashboardClick}
          className="hover:underline-offset-4 hover:underline"
        >
          {navLabel}
        </h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm transition"
          >
            <User size={18} className="text-gray-700" />
            <span className="text-gray-800 font-medium">{user?.name}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow z-50">
              <button
                onClick={handleLogout}
                className="flex items-center rounded-lg gap-2 w-full px-4 py-2 text-sm text-red-600 bg-gray-100 hover:bg-gray-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
