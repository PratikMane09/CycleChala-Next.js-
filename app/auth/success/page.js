"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const AuthSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setTimeout(() => {
        router.push("/shop");
      }, 1500);
    } else {
      router.push("/auth/error");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Login successful! Redirecting...
        </div>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
        </div>
      </div>
    </div>
  );
};

export default function AuthSuccess() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
