import React from "react";
import ServicePage from "./component/ServicePage";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Professional Cycle Services | Cycle Challenge</title>
        <meta
          name="description"
          content="Expert bicycle repair, maintenance, and customization services. Same-day repairs, free estimates, and certified mechanics at Cycle Challenge."
        />
        <meta
          name="keywords"
          content="bicycle repair, bike maintenance, cycle services, bike customization"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.cyclechallenge.in/service" />
        <meta
          property="og:title"
          content="Professional Cycle Services | Cycle Challenge"
        />
        <meta
          property="og:description"
          content="Expert bicycle repair, maintenance, and customization services with certified mechanics."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.cyclechallenge.in/service"
        />
      </Head>
      <ServicePage />
    </>
  );
}

export default Page;
