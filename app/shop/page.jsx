"use  client";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";
import ShopContent from "./compoenent/ShopContent";
function page() {
  return (
    <div className="bg-gray-50">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Loader className="w-8 h-8 text-sky-600 animate-spin" />
          </div>
        }
      >
        <ShopContent />
      </Suspense>
    </div>
  );
}

export default page;
