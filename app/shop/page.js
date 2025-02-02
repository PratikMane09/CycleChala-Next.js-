// page.tsx
"use client";

import React, { Suspense } from "react";
import ShopContent from "./compoenent/ShopContent";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShopContent />
    </Suspense>
  );
}

export default Page;
