"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  createTheme,
  ThemeProvider,
  Button,
  Divider,
  Dialog,
  DialogContent,
  Stack,
} from "@mui/material";
import {
  Phone,
  User,
  Heart,
  ShoppingCart,
  Search,
  Menu as MenuIcon,
  X,
  Globe,
  Clock,
  LogIn,
} from "lucide-react";
import { useWishlist, WishlistProvider } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import SerchSection from "./SearchSection";
// Custom theme with professional white color scheme and subtle definition
const theme = createTheme({
  typography: {
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        },
      },
    },
  },
});

// Custom hook for active link
const useActiveLink = () => {
  const pathname = usePathname();
  return (path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { count: wishlistCount, fetchwishlist } = useWishlist();
  const { count: cartcount } = useCart();

  const router = useRouter();
  const pathname = usePathname();
  const isActive = useActiveLink();

  // Close menus on route change
  useEffect(() => {
    setMobileMenu(false);
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle mobile auth navigation
  const handleAuthNavigation = (path) => {
    setMobileMenu(false);
    router.push(path);
  };

  const navLinks = [
    { path: "/", display: "Home" },
    { path: "/shop", display: "Cycles" },
    { path: "/about", display: "About us" },
    { path: "/service", display: "Services" },
    { path: "/locate", display: "Locate Store" },
    { path: "/contact", display: "Contact" },
  ];
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    window.addEventListener("routeChangeStart", handleRouteChange);
    return () =>
      window.removeEventListener("routeChangeStart", handleRouteChange);
  }, []);

  // Middle Bar Component
  const MiddleBar = () => (
    <div
      className={`bg-white py-4 border-b border-gray-100 relative ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <Container maxWidth="lg">
        <div className="flex justify-between items-center px-4">
          <Link
            href="/"
            className="flex items-center gap-2 no-underline shrink-0"
          >
            <span className="text-2xl font-bold text-gray-900">CycleChala</span>
            {/* <span className="text-xl text-gray-700">Chala</span> */}
          </Link>

          <div className="hidden lg:flex gap-12">
            <div className="flex items-center gap-3">
              <Globe className="text-gray-700" size={24} />
              <div>
                <h4 className="m-0 text-gray-900 font-semibold text-base">
                  India
                </h4>
                <h6 className="m-0 text-gray-600 text-sm">Chh.Sambhajinagar</h6>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-gray-700" size={24} />
              <div>
                <h4 className="m-0 text-gray-900 font-semibold text-base">
                  Monday to Sunday
                </h4>
                <h6 className="m-0 text-gray-600 text-sm">7am - 10pm</h6>
              </div>
            </div>
          </div>

          <a
            href="https://api.whatsapp.com/send?phone=8806582924"
            className="flex items-center justify-center gap-2 shrink-0
              bg-gradient-to-r from-[#25D366] to-[#128C7E] 
              text-white px-5 py-2.5 rounded-full 
              shadow-lg hover:shadow-xl 
              transform hover:-translate-y-1 
              transition-all duration-300 
              font-semibold text-base 
              group"
          >
            <Phone
              size={22}
              className="group-hover:rotate-12 transition-transform duration-300"
            />
            WhatsApp Us
            <div
              className="absolute top-0 right-0 -mt-1 -mr-1 
              bg-red-500 text-white text-xs 
              rounded-full px-2 py-0.5 
              animate-pulse"
            >
              Quick
            </div>
          </a>
        </div>
      </Container>
    </div>
  );
  return (
    <ThemeProvider theme={theme}>
      <div
        className={`fixed top-0 w-full z-[40] bg-white ${
          isScrolled ? "shadow-md" : "border-b border-gray-100"
        }`}
      >
        <MiddleBar />

        {/* Navigation Bar with improved left spacing */}
        <AppBar
          position="static"
          sx={{
            bgcolor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            position: "relative",
            zIndex: "auto",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              className="justify-between"
              sx={{
                px: { xs: 2, md: 4 }, // Increased padding
                minHeight: "64px",
              }}
            >
              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                onClick={() => setIsMenuOpen(true)}
                className="block lg:hidden"
                size="large"
                edge="start"
              >
                <MenuIcon className="text-gray-800" />
              </IconButton>

              {/* Desktop Navigation with improved spacing */}
              <Box
                className="hidden lg:flex items-center"
                sx={{
                  flex: "1 1 auto",
                  ml: 4, // Add left margin
                  "& > div": { width: "100%" },
                }}
              >
                <Box className="flex" sx={{ gap: "2.5rem" }}>
                  {" "}
                  {/* Increased gap */}
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`text-gray-700 no-underline uppercase text-sm py-4 border-b-2 
                        transition-all duration-300 font-medium whitespace-nowrap
                        ${
                          isActive(link.path)
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent hover:border-blue-300 hover:text-blue-500"
                        }`}
                    >
                      {link.display}
                    </Link>
                  ))}
                </Box>
              </Box>

              {/* Action Icons with improved spacing */}
              <Box
                className="flex items-center"
                sx={{ gap: "2rem", ml: "auto" }}
              >
                {" "}
                {/* Increased gap */}
                <Box
                  className="flex items-center bg-gray-50 rounded-xl shadow-sm"
                  sx={{
                    px: 3, // Increased padding
                    py: 1.5,
                    gap: "1.5rem", // Increased gap
                  }}
                >
                  <SerchSection />

                  {/* Wishlist Section with improved spacing */}
                  <div
                    className="relative group cursor-pointer px-2"
                    onClick={() => router.push("/wishlist")}
                  >
                    <Heart
                      className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                      size={22}
                    />
                    {wishlistCount > 0 && (
                      <span
                        className="absolute -top-2 -right-2 bg-blue-600 text-white 
                        text-xs font-semibold rounded-full w-5 h-5 flex items-center 
                        justify-center shadow-sm transform scale-100 group-hover:scale-110 
                        transition-transform duration-300"
                      >
                        {wishlistCount}
                      </span>
                    )}
                  </div>

                  {/* Cart Section with improved spacing */}
                  <div
                    className="relative group cursor-pointer px-2"
                    onClick={() => router.push("/cart")}
                  >
                    <ShoppingCart
                      className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
                      size={22}
                    />
                    {cartcount > 0 && (
                      <span
                        className="absolute -top-2 -right-2 bg-blue-600 text-white 
                        text-xs font-semibold rounded-full w-5 h-5 flex items-center 
                        justify-center shadow-sm transform scale-100 group-hover:scale-110 
                        transition-transform duration-300"
                      >
                        {cartcount}
                      </span>
                    )}
                  </div>
                </Box>
                {/* Auth Buttons with improved spacing */}
                <Box className="hidden lg:flex items-center gap-3">
                  <Link href="/login" className="no-underline">
                    <Button
                      variant="outlined"
                      startIcon={<LogIn size={18} />}
                      className="transition-transform hover:-translate-y-0.5"
                      sx={{
                        minWidth: { lg: "120px", xl: "140px" },
                        height: "42px",
                        color: "#0284c7",
                        borderColor: "#0284c7",
                        borderWidth: "1.5px",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        borderRadius: "8px",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#0369a1",
                          backgroundColor: "rgba(2, 132, 199, 0.02)",
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="no-underline">
                    <Button
                      variant="contained"
                      startIcon={<User size={18} />}
                      className="transition-transform hover:-translate-y-0.5"
                      sx={{
                        minWidth: { lg: "160px", xl: "180px" },
                        height: "42px",
                        backgroundColor: "#0284c7",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        borderRadius: "8px",
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#0369a1",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Create Account
                    </Button>
                  </Link>
                </Box>
                <Box className="flex lg:hidden items-center">
                  <IconButton
                    className="relative p-2 rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileMenu(true)}
                  >
                    <User size={22} className="text-gray-700" />
                  </IconButton>
                </Box>
                {/* Mobile Menu */}
                <Dialog
                  open={mobileMenu}
                  onClose={() => setMobileMenu(false)}
                  className="lg:hidden"
                  fullWidth
                  maxWidth="xs"
                >
                  <DialogContent className="p-4">
                    <Stack spacing={2}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<LogIn size={18} />}
                        onClick={() => handleAuthNavigation("/login")}
                        sx={{
                          height: "48px",
                          color: "#0284c7",
                          borderColor: "#0284c7",
                          borderWidth: "1.5px",
                          borderRadius: "8px",
                          textTransform: "none",
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<User size={18} />}
                        onClick={() => handleAuthNavigation("/register")}
                        sx={{
                          height: "48px",
                          backgroundColor: "#0284c7",
                          borderRadius: "8px",
                          textTransform: "none",
                        }}
                      >
                        Create Account
                      </Button>
                    </Stack>
                  </DialogContent>
                </Dialog>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          className="lg:hidden"
          PaperProps={{
            sx: {
              backgroundColor: "#FFFFFF",
              width: 320,
              boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
              borderRight: "1px solid rgba(0,0,0,0.08)",
              zIndex: 45,
            },
          }}
          ModalProps={{
            sx: {
              zIndex: 45,
            },
          }}
        >
          <Box className="h-full bg-white">
            {/* Header with Logo */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <img
                  src="/api/placeholder/32/32"
                  alt="Logo"
                  className="h-8 w-8"
                />
                <span className="text-xl font-semibold text-gray-900">
                  CycleChala
                </span>
              </div>
              <IconButton
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </IconButton>
            </div>

            {/* Navigation Links */}
            <List className="py-4">
              {navLinks.map((link) => (
                <ListItem
                  key={link.path}
                  disablePadding
                  className={isActive(link.path) ? "bg-blue-50" : ""}
                >
                  <Link
                    href={link.path}
                    className={`flex items-center w-full px-6 py-4
                  transition-all duration-200 no-underline
                  ${
                    isActive(link.path)
                      ? "text-blue-600 bg-blue-50 font-medium"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ListItemText
                      primary={link.display}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: "1rem",
                          letterSpacing: "-0.01em",
                          fontWeight: isActive(link.path) ? 500 : 400,
                          lineHeight: 1.5,
                        },
                      }}
                    />
                  </Link>
                </ListItem>
              ))}

              {/* Auth Section */}
              <Divider className="my-4" />
              <div className="px-6 py-4 space-y-3">
                <Link
                  href="/login"
                  className="flex w-full py-3 px-6 text-white bg-blue-600 rounded-lg
                font-medium text-center justify-center hover:bg-blue-700
                transition-colors duration-200 no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex w-full py-3 px-6 text-blue-600 bg-blue-50 rounded-lg
                font-medium text-center justify-center hover:bg-blue-100
                transition-colors duration-200 no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </List>
          </Box>
        </Drawer>
      </div>
      <div className="h-[70px]" />{" "}
      {/* Adjust this value based on your header height */}
    </ThemeProvider>
  );
};

export default Header;
