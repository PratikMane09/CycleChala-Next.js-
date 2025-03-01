import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import Script from "next/script";
import Header from "./component/Header";
import Footer from "./component/Footer";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="sX4yn0pVBevRGiKZAceQWIoW9lNKU3Ah6FB-nfYzdBA"
        />
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-VXWHX30Z1B"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VXWHX30Z1B');
          `}
        </Script>
      </head>
      <body>
        <CartProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
