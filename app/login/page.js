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

  return (
    <>
      <div className="min-h-screen h-[450px]  bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center  px-4 sm:px-6 lg:px-8">
        <Paper
          elevation={3}
          className="max-w-5xl w-full mx-auto overflow-hidden rounded-2xl"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 p-6 lg:p-10">
              <div className="flex flex-col max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <div className="bg-sky-100 p-2 rounded-lg">
                    <Bike className="h-6 w-6 text-sky-600" />
                  </div>
                  <Typography variant="h5" className="font-bold text-gray-900">
                    CycleHub
                  </Typography>
                </div>

                <Typography
                  variant="h4"
                  className="text-center font-bold text-gray-900 mb-1"
                >
                  Welcome Back!
                </Typography>
                <Typography
                  variant="body1"
                  className="text-center text-gray-600 mb-6"
                >
                  Continue your cycling journey
                </Typography>

                {error && (
                  <Typography color="error" className="text-center mb-4">
                    {error}
                  </Typography>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <TextField
                    fullWidth
                    required
                    id="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail className="h-5 w-5 text-sky-500" />
                        </InputAdornment>
                      ),
                    }}
                    className="bg-white"
                  />

                  <TextField
                    fullWidth
                    required
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock className="h-5 w-5 text-sky-500" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div className="flex items-center justify-between">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="text-sky-500"
                        />
                      }
                      label="Remember me"
                    />
                    <button
                      onClick={handleForgotPassword}
                      className="text-sm font-medium text-sky-600 hover:text-sky-500"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="bg-sky-500 hover:bg-sky-600 py-3 text-white font-medium rounded-lg transition-colors duration-200"
                    endIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    Sign In
                  </Button>
                </form>

                <Typography
                  variant="body2"
                  className="text-center mt-6 text-gray-600"
                >
                  Don not have an account?{" "}
                  <a
                    href="/register"
                    className="font-medium text-sky-600 hover:text-sky-500 transition-colors duration-200"
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
    </>
  );
};

export default LoginForm;
