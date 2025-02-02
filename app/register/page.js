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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6">
      <Paper elevation={3} className="w-full max-w-5xl mx-auto rounded-2xl">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Image */}
          <div className="hidden lg:block w-1/2 relative bg-sky-500">
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="h-full flex flex-col justify-center p-4 sm:p-6 relative z-10">
              <img
                src="/Images/cycling-hero.jpg"
                alt="Cyclist in action"
                className="rounded-xl object-cover w-full h-44 lg:h-auto shadow-lg mb-6"
              />
              <div className="text-white space-y-2">
                <Typography className="text-2xl sm:text-3xl font-bold">
                  Join Our Cycling Community
                </Typography>
                <Typography className="text-sm sm:text-base opacity-90">
                  Connect with fellow cyclists, track your rides, and discover
                  new adventures
                </Typography>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-md mx-auto w-full space-y-6">
              {error && (
                <Alert severity="error" className="text-sm sm:text-base">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" className="text-sm sm:text-base">
                  {success}
                </Alert>
              )}

              <div className="text-center space-y-4">
                <div className="bg-sky-100 p-2 sm:p-3 rounded-full inline-block">
                  <Bike className="h-6 w-6 sm:h-8 sm:w-8 text-sky-500" />
                </div>
                <div className="space-y-2">
                  <Typography className="text-xl sm:text-2xl font-bold text-gray-900">
                    {showOtpInput ? "Verify Email" : "Create Account"}
                  </Typography>
                  <Typography className="text-sm sm:text-base text-gray-600">
                    {showOtpInput
                      ? "Enter the verification code sent to your email"
                      : "Start your cycling journey today"}
                  </Typography>
                </div>
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
                      className="py-2 sm:py-2.5 border-gray-300 hover:bg-gray-50 text-gray-700 text-sm sm:text-base font-medium rounded-lg"
                      onClick={() => {
                        /* Add Google sign-in handler */
                      }}
                    >
                      <GoogleIcon />
                      <span className="ml-2">Continue with Google</span>
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-2 bg-white text-xs sm:text-sm text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    {/* Form Fields with responsive styling */}
                    {[
                      {
                        id: "name",
                        label: "Full Name",
                        icon: (
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                        ),
                        type: "text",
                        placeholder: "John Doe",
                      },
                      {
                        id: "email",
                        label: "Email Address",
                        icon: (
                          <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                        ),
                        type: "email",
                        placeholder: "you@example.com",
                      },
                      {
                        id: "phone",
                        label: "Phone Number",
                        icon: (
                          <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                        ),
                        type: "tel",
                        placeholder: "+1 (555) 000-0000",
                      },
                      {
                        id: "password",
                        label: "Password",
                        icon: (
                          <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                        ),
                        type: showPassword ? "text" : "password",
                        placeholder: "••••••••",
                        hasPasswordToggle: true,
                      },
                    ].map((field) => (
                      <TextField
                        key={field.id}
                        fullWidth
                        required
                        id={field.id}
                        label={field.label}
                        type={field.type}
                        value={formData[field.id]}
                        onChange={handleChange}
                        error={Boolean(formErrors[field.id])}
                        helperText={formErrors[field.id]}
                        placeholder={field.placeholder}
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {field.icon}
                            </InputAdornment>
                          ),
                          endAdornment: field.hasPasswordToggle && (
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
                        className="bg-white"
                      />
                    ))}
                  </>
                ) : (
                  <TextField
                    fullWidth
                    required
                    id="otp"
                    label="Verification Code"
                    value={formData.otp}
                    onChange={handleChange}
                    error={Boolean(formErrors.otp)}
                    helperText={formErrors.otp}
                    placeholder="Enter 6-digit code"
                    size="small"
                    InputProps={{
                      className: "text-sm sm:text-base",
                    }}
                  />
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  className="bg-sky-500 hover:bg-sky-600 py-2 sm:py-2.5 text-sm sm:text-base font-medium rounded-lg mt-6"
                >
                  {isLoading
                    ? "Please wait..."
                    : showOtpInput
                    ? "Verify Code"
                    : "Join the Community"}
                </Button>
              </form>

              <Typography className="text-center text-sm sm:text-base text-gray-600">
                Already a member?{" "}
                <a
                  href="/login"
                  className="font-medium text-sky-600 hover:text-sky-500"
                >
                  Sign in
                </a>
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};
export default RegisterForm;
