// page.tsx
"use client";

import React, { Suspense } from "react";
import ShopContent from "./compoenent/ShopContent";
import Head from "next/head";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
    </div>
  );
}

function Page() {
  return (
    <>
      <Head>
        <title>Premium Bicycles & Cycling Gear | Cycle Challenge Shop</title>
        <meta
          name="description"
          content="Browse our extensive collection of high-quality bicycles, accessories, and cycling gear. Find mountain bikes, road bikes, e-bikes and more with free shipping options."
        />
        <meta
          name="keywords"
          content="bicycles, mountain bikes, road bikes, cycling gear, bike shop, cycle accessories"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.cyclechallenge.in/shop" />
        <meta
          property="og:title"
          content="Premium Bicycles & Cycling Gear | Cycle Challenge Shop"
        />
        <meta
          property="og:description"
          content="Explore our collection of premium bicycles and cycling accessories with expert advice and inpetitive pricing."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.cyclechallenge.in/shop" />
        <meta
          property="og:image"
          content="https://www.cyclechallenge.in/images/shop-display.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Mountain Bikes",
                  "url": "https://www.cyclechallenge.in/shop"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Road Bikes",
                  "url": "https://www.cyclechallenge.in/shop"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "E-Bikes",
                  "url": "https://www.cyclechallenge.in/shop"
                }
              ]
            }
          `}
        </script>
      </Head>
      <Suspense fallback={<LoadingFallback />}>
        <ShopContent />
      </Suspense>
    </>
  );
}

export default Page;
