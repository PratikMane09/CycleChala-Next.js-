"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Bike, ArrowRight } from "lucide-react";
import {
  TextField,
  Button,
  InputAdornment,
  Paper,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { API_BASE_URL } from "../../config/api";
import Footer from "../component/Footer";
import Header from "../component/Header";
const GoogleIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: lowercaseEmail, password }), // Send lowercase email
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Handle successful login
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("role", data.user.role);
      if (rememberMe) {
        localStorage.setItem("email", email);
      }
      if (data.user.role === "admin") {
        // Use strict equality operator
        window.location.href = "/dashboard/admin";
      } else {
        window.location.href = "/shop";
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: lowercaseEmail }), // Send lowercase email
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      // Redirect to OTP verification page
      window.location.href = `/resetpassword?email=${encodeURIComponent(
        email
      )}`;
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGoogleSignIn = () => {
    // Implement Google Sign-in logic here
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Paper elevation={3} className="w-full max-w-5xl mx-auto rounded-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col max-w-md mx-auto space-y-6">
              {/* Logo and Title */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="bg-sky-100 p-2 rounded-lg">
                    <Bike className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600" />
                  </div>
                  <Typography className="text-lg sm:text-xl font-bold text-gray-900">
                    CycleChala
                  </Typography>
                </div>
                <div className="space-y-2">
                  <Typography className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Welcome Back!
                  </Typography>
                  <Typography className="text-sm sm:text-base text-gray-600">
                    Continue your cycling journey
                  </Typography>
                </div>
              </div>

              {error && (
                <Typography color="error" className="text-center text-sm">
                  {error}
                </Typography>
              )}

              {/* Google Sign In Button */}
              <Button
                fullWidth
                variant="outlined"
                className="py-2 sm:py-2.5 border-gray-300 hover:bg-gray-50 text-gray-700 text-sm sm:text-base font-medium rounded-lg"
                onClick={handleGoogleSignIn}
              >
                <GoogleIcon />
                <span className="ml-2">Continue with Google</span>
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-xs sm:text-sm text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <TextField
                  fullWidth
                  required
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                      </InputAdornment>
                    ),
                    className: "text-sm sm:text-base",
                  }}
                  className="bg-white"
                />

                <TextField
                  fullWidth
                  required
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    className: "text-sm sm:text-base",
                  }}
                />

                <div className="flex items-center justify-between text-sm sm:text-base">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="text-sky-500"
                        size="small"
                      />
                    }
                    label={
                      <span className="text-sm sm:text-base">Remember me</span>
                    }
                  />
                  <button
                    onClick={handleForgotPassword}
                    className="text-sm sm:text-base font-medium text-sky-600 hover:text-sky-500"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="bg-sky-500 hover:bg-sky-600 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg"
                  endIcon={<ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />}
                >
                  Sign In
                </Button>
              </form>

              <Typography className="text-center text-sm sm:text-base text-gray-600">
                Do not have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-sky-600 hover:text-sky-500"
                >
                  Sign up
                </a>
              </Typography>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block w-1/2 bg-sky-500 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-600 to-sky-400 opacity-90" />
            <div className="h-full flex flex-col justify-center p-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
                <Typography variant="h4" className="font-bold mb-2">
                  Cycling is more than just exercise - it is freedom on two
                  wheels
                </Typography>
                <div className="flex items-center mt-6">
                  <img
                    src="/Images/cycling-hero.jpg"
                    alt="User"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <Typography variant="subtitle1" className="font-semibold">
                      Pravin Mane
                    </Typography>
                    <Typography variant="body2" className="opacity-80">
                      Shop Owner
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default LoginForm;
