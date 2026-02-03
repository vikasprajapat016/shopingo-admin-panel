import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserShield, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user, } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const res = await api.post("user/signin", {
        email,
        password,
      });

      const { user, message } = res.data;

      // 🔐 ADMIN ROLE CHECK
      if (
        !["SUPER_ADMIN", "USER_ADMIN", "PRODUCT_ADMIN"].includes(user.role)
      ) {
        toast.error("Access denied: Admins only");
        return;
      }

      toast.success(message || "Admin login successful");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };


    useEffect(() => {
    // If user is logged in and is admin, redirect to dashboard
    if (
      user &&
      ["SUPER_ADMIN", "USER_ADMIN", "PRODUCT_ADMIN"].includes(user.role)
    ) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/90 backdrop-blur border border-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600/20 p-4 rounded-full mb-4">
            <FaUserShield className="text-indigo-500 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">
            Secure access to admin dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            <FaLock />
            {loading ? "Signing in..." : "Login to Dashboard"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          © {new Date().getFullYear()} Admin Panel • Secure Access
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
