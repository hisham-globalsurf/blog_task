import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useNavigate } from "react-router-dom";
import AuthAside from "@/components/layout/AuthAside";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(register(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/", { state: { fromAuth: true } });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Left Side */}
      <AuthAside />

      {/* Right Side */}
      <div className="flex items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white p-10 rounded-2xl border border-gray-200 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Create your Account
          </h2>

          {/* Name Field */}
          <div className="space-y-1">
            <Label htmlFor="name" className="text-gray-800">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-gray-800">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <Label htmlFor="password" className="text-gray-800">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Choose a secure password"
              value={form.password}
              onChange={handleChange}
              className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Error Message */}
          <div className="h-[16px] -mt-2">
            <ErrorMessage message={error} />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition rounded-md"
          >
            {loading ? "Creating account..." : "Register"}
          </Button>

          <p
            onClick={() => navigate("/login")}
            className="cursor-pointer text-[14px] text-center text-gray-700"
          >
            Already have an account?{" "}
            <span className="font-semibold text-indigo-600 hover:underline">
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
