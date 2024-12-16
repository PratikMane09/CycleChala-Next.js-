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
} from "lucide-react";

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
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)", // Very subtle shadow
          borderBottom: "1px solid rgba(0,0,0,0.06)", // Subtle border
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
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const isActive = useActiveLink();

  const navLinks = [
    { path: "/", display: "Shop" },
    { path: "/about", display: "About us" },
    { path: "/locate", display: "Locate Store" },
    { path: "/contact", display: "Contact" },
  ];

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

  // Top Bar Component
  const TopBar = () => (
    <div className="hidden md:block bg-gray-50 text-gray-800 py-2 border-b border-gray-100">
      <Container maxWidth="lg" className="px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-medium text-sm">Need Help?</span>
            <a
              href="tel:+917038698440"
              className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
            >
              <span className="bg-blue-50 p-1 rounded-full">
                <Phone size={14} className="text-blue-600" />
              </span>
              <span className="text-sm font-medium">+917038698440</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <User size={16} /> Login
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <User size={16} /> Register
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );

  // Middle Bar Component
  const MiddleBar = () => (
    <div
      className={`bg-white py-4 border-b border-gray-100 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <Container maxWidth="lg" className="px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl font-bold text-gray-900">Cycle</span>
            <span className="text-xl text-gray-700">Service</span>
          </Link>

          <div className="hidden lg:flex gap-8">
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
            className="flex items-center justify-center gap-2 
    bg-gradient-to-r from-[#25D366] to-[#128C7E] 
    text-white px-5 py-2.5 rounded-full 
    shadow-lg hover:shadow-xl 
    transform hover:-translate-y-1 
    transition-all duration-300 
    font-semibold text-base 
    group"
            target="_blank"
            rel="noopener noreferrer"
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
        className={`fixed top-0 w-full z-50 bg-white 
        ${isScrolled ? "shadow-md" : "border-b border-gray-100"}`}
      >
        {/* <TopBar /> */}
        <MiddleBar />

        {/* Navigation Bar */}
        <AppBar
          position="static"
          sx={{
            bgcolor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters className="justify-between">
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

              {/* Desktop Navigation */}
              <Box className="hidden lg:flex gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`text-gray-700 no-underline uppercase text-sm py-4 border-b-2 
                      transition-all duration-300 font-medium ${
                        isActive(link.path)
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent hover:border-blue-300 hover:text-blue-500"
                      }`}
                  >
                    {link.display}
                  </Link>
                ))}
              </Box>

              {/* Action Icons with WhatsApp Button for Mobile */}
              <Box className="flex items-center gap-4">
                <Box className="flex items-center gap-4 bg-gray-100 px-6 py-2 rounded-full">
                  <Search
                    className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                    size={20}
                  />
                  <Heart
                    className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                    size={20}
                  />
                  <ShoppingCart
                    className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                    size={20}
                  />
                </Box>
                {/* Mobile WhatsApp Button */}
                <a
                  href="https://api.whatsapp.com/send?phone=8806582924"
                  className="block lg:hidden ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors">
                    <Phone size={20} className="text-white" />
                  </div>
                </a>
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
              width: 280,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // Added subtle shadow to drawer
              borderRight: "1px solid rgba(0,0,0,0.06)",
            },
          }}
        >
          <Box className="h-full text-gray-900">
            <div className="flex justify-end p-4">
              <IconButton
                onClick={() => setIsMenuOpen(false)}
                sx={{ color: "#121212" }}
              >
                <X />
              </IconButton>
            </div>
            <List>
              {navLinks.map((link) => (
                <ListItem
                  key={link.path}
                  disablePadding
                  className={isActive(link.path) ? "bg-blue-50" : ""}
                >
                  <Link
                    href={link.path}
                    className={`text-gray-800 no-underline w-full px-6 py-3 
                      transition-colors duration-300 ${
                        isActive(link.path)
                          ? "text-blue-600 bg-blue-50"
                          : "hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ListItemText
                      primary={link.display}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: "1rem",
                          fontWeight: isActive(link.path) ? 600 : 400,
                        },
                      }}
                    />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

export default Header;
