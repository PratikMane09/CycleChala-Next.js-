"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Phone, Lock, Bike } from "lucide-react";
import {
  TextField,
  Button,
  InputAdornment,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { Alert } from "@mui/material";
import { API_BASE_URL } from "../../config/api";
import Header from "../component/Header";
const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      otp: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleInitiateRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/initiate-register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email.toLowerCase(),
            phone: formData.phone,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Verification code sent to your email");
      setShowOtpInput(true);
    } catch (err) {
      setError(err.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setFormErrors((prev) => ({
        ...prev,
        otp: "Please enter the verification code",
      }));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };
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

  return (
    <>
      <div className="h-[800px]    bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center">
        {" "}
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Paper elevation={3} className="overflow-hidden rounded-2xl">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column - Image */}
              <div className="w-full lg:w-1/2 hidden md:block relative bg-sky-500">
                <div className="absolute inset-0 bg-black bg-opacity-20" />
                <div className="h-full flex flex-col justify-center p-3 relative z-10">
                  <img
                    src="/Images/cycling-hero.jpg"
                    alt="Cyclist in action"
                    className="rounded-xl object-cover w-full h-44 lg:h-auto shadow-lg mb-6"
                  />
                  <div className="text-white">
                    <Typography variant="h4" className="font-bold mb-4">
                      Join Our Cycling Community
                    </Typography>
                    <Typography variant="h6" className="opacity-90">
                      Connect with fellow cyclists, track your rides, and
                      discover new adventures
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="w-full h-full  lg:w-1/2 bg-white p-8 pb-10 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                  {error && <Alert className="mb-4">{error}</Alert>}

                  {success && (
                    <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                      {success}
                    </Alert>
                  )}

                  <div className="flex flex-col items-center mb-8">
                    <div className="bg-sky-100 p-3 rounded-full mb-4">
                      <Bike className="h-8 w-8 text-sky-500" />
                    </div>
                    <Typography
                      variant="h4"
                      className="text-center font-bold text-gray-900"
                    >
                      {showOtpInput ? "Verify Email" : "Create Account"}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-center text-gray-600 mt-2"
                    >
                      {showOtpInput
                        ? "Enter the verification code sent to your email"
                        : "Start your cycling journey today"}
                    </Typography>
                  </div>

                  <form
                    onSubmit={
                      showOtpInput ? handleVerifyOtp : handleInitiateRegister
                    }
                    className="space-y-4"
                  >
                    {!showOtpInput ? (
                      <>
                        <Button
                          fullWidth
                          variant="outlined"
                          className="py-2.5 mb-6 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors duration-200 normal-case flex items-center justify-center"
                          onClick={() => {
                            /* Add Google sign-in handler */
                          }}
                        >
                          <GoogleIcon />
                          Continue with Google
                        </Button>
                        <div className="relative mb-6">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                              Or continue with
                            </span>
                          </div>
                        </div>
                        <TextField
                          fullWidth
                          required
                          id="name"
                          label="Full Name"
                          variant="outlined"
                          value={formData.name}
                          onChange={handleChange}
                          error={Boolean(formErrors.name)}
                          helperText={formErrors.name}
                          placeholder="John Doe"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <User className="h-5 w-5 text-sky-500" />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          fullWidth
                          required
                          id="email"
                          label="Email Address"
                          type="email"
                          variant="outlined"
                          value={formData.email}
                          onChange={handleChange}
                          error={Boolean(formErrors.email)}
                          helperText={formErrors.email}
                          placeholder="you@example.com"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Mail className="h-5 w-5 text-sky-500" />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          fullWidth
                          required
                          id="phone"
                          label="Phone Number"
                          type="tel"
                          variant="outlined"
                          value={formData.phone}
                          onChange={handleChange}
                          error={Boolean(formErrors.phone)}
                          helperText={formErrors.phone}
                          placeholder="+1 (555) 000-0000"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone className="h-5 w-5 text-sky-500" />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          fullWidth
                          required
                          id="password"
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          variant="outlined"
                          value={formData.password}
                          onChange={handleChange}
                          error={Boolean(formErrors.password)}
                          helperText={formErrors.password}
                          placeholder="••••••••"
                          size="small"
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
                                  size="small"
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
                      </>
                    ) : (
                      <TextField
                        fullWidth
                        required
                        id="otp"
                        label="Verification Code"
                        variant="outlined"
                        value={formData.otp}
                        onChange={handleChange}
                        error={Boolean(formErrors.otp)}
                        helperText={formErrors.otp}
                        placeholder="Enter 6-digit code"
                        size="small"
                      />
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isLoading}
                      className="bg-sky-500 hover:bg-sky-600 py-2.5 text-white font-medium rounded-lg transition-colors duration-200 mt-6"
                    >
                      {isLoading
                        ? "Please wait..."
                        : showOtpInput
                        ? "Verify Code"
                        : "Join the Community"}
                    </Button>
                  </form>

                  <Typography
                    variant="body2"
                    className="text-center mt-6 text-gray-600"
                  >
                    Already a member?{" "}
                    <a
                      href="/login"
                      className="font-medium text-sky-600 hover:text-sky-500 transition-colors duration-200"
                    >
                      Sign in
                    </a>
                  </Typography>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
