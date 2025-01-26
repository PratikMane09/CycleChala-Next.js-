import localFont from "next/font/local";
import "./globals.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {" "}
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
