"use client";
import { useRouter } from "next/navigation";
import { Button, Alert, Typography, Paper } from "@mui/material";

export default function AuthError() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50 flex items-center justify-center p-4">
      <Paper className="max-w-md w-full p-6 space-y-4">
        <Alert severity="error" className="mb-4">
          Authentication failed
        </Alert>

        <Typography className="text-center text-gray-600 mb-4">
          There was a problem signing you in with Google. Please try again or
          use another sign-in method.
        </Typography>

        <div className="flex flex-col space-y-3">
          <Button
            variant="contained"
            fullWidth
            className="bg-sky-500 hover:bg-sky-600"
            onClick={() => router.push("/register")}
          >
            Try Again
          </Button>

          <Button variant="outlined" fullWidth onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </Paper>
    </div>
  );
}
