import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Building2, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

const Login = ({ setCurrPage }) => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "tenant",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "owner", label: "Owner" },
    { value: "tenant", label: "Tenant" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: "1",
        name: "John Doe",
        email: formData.email,
        role: formData.role,
      };
      login(userData);
      setLoading(false);

      // Navigate based on role
      const routes = {
        admin: "/admin/dashboard",
        owner: "/owner/dashboard",
        tenant: "/tenant/dashboard",
      };
      navigate(routes[formData.role]);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center animate-slide-down">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 shadow-lg bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text">
            PG Nexus
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back! Please login to continue.
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 card animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Select
              label="Login As"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              placeholder="Enter your email"
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={Lock}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 right-3 top-9 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              size="lg"
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                // to="/signup"
                className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                onClick={() => setCurrPage("signup")}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="p-4 mt-6 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <p className="mb-2 text-sm font-medium text-blue-900 dark:text-blue-300">
            Demo Credentials:
          </p>
          <div className="space-y-1 text-xs text-blue-700 dark:text-blue-400">
            <p>Admin: admin@pgnexus.com / password</p>
            <p>Owner: owner@pgnexus.com / password</p>
            <p>Tenant: tenant@pgnexus.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
