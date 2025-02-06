"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress, Alert } from "@mui/material";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // Store the token
      localStorage.setItem("token", token);

      // You might want to store user info too if available
      // localStorage.setItem('user', JSON.stringify(user));

      // Show success message briefly before redirect
      setTimeout(() => {
        router.push("/shop"); // or wherever you want to redirect after login
      }, 1500);
    } else {
      router.push("/auth/error");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <Alert severity="success">Login successful! Redirecting...</Alert>
        <CircularProgress className="mt-4" />
      </div>
    </div>
  );
}
