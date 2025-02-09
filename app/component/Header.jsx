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
  Popover,
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
  LogOut,
  Package,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import SerchSection from "./SearchSection";

// Custom hook for authentication
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    setIsAuthenticated(!!token);
    setUserRole(role);
    setUserEmail(email);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail(null);
    router.push("/");
  };

  return { isAuthenticated, userRole, userEmail, logout };
};
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
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, userRole, userEmail, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const { count: cartcount } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const isActive = useActiveLink();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  // Protected route handler
  const handleProtectedNavigation = (path) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    router.push(path);
  };

  // User menu items
  const menuItems = [
    {
      label: "My Profile",
      icon: <User size={18} />,
      onClick: () => router.push("/profile"),
    },
    {
      label: "My Orders",
      icon: <Package size={18} />,
      onClick: () => router.push("/order"),
    },
    ...(userRole === "admin"
      ? [
          {
            label: "Dashboard",
            icon: <Settings size={18} />,
            onClick: () => router.push("/dashboard/admin"),
          },
        ]
      : []),
    {
      label: "Logout",
      icon: <LogOut size={18} />,
      onClick: logout,
    },
  ];

  // Update navLinks based on role
  const navLinks = [
    { path: "/", display: "Home" },
    { path: "/shop", display: "Cycles" },
    { path: "/about", display: "About us" },
    { path: "/service", display: "Services" },
    { path: "/locate", display: "Locate Store" },
    { path: "/contact", display: "Contact" },
    ...(userRole === "admin"
      ? [{ path: "/admin/dashboard", display: "Dashboard" }]
      : []),
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

  // Mobile Menu Items
  const MobileMenuItem = ({ href, children, onClick }) => (
    <Link
      href={href}
      className="flex items-center w-full px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
      onClick={onClick}
    >
      {children}
    </Link>
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

              {/* Action Icons */}
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
              </Box>
              {isAuthenticated ? (
                <div className="relative hidden lg:block">
                  {" "}
                  {/* Added relative positioning */}
                  <Button
                    onClick={handleProfileClick}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    endIcon={<ChevronDown size={16} />}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {userEmail?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium max-w-[150px] truncate">
                      {userEmail}
                    </span>
                  </Button>
                  {/* Profile Menu */}
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleProfileClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    PaperProps={{
                      elevation: 2,
                      sx: {
                        mt: 1,
                        minWidth: "200px",
                        maxWidth: "250px",
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "background.paper",
                        position: "relative",
                      }}
                    >
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">
                          {userEmail}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 capitalize">
                          {userRole}
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {menuItems.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              item.onClick();
                              handleProfileClose();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </Box>
                  </Popover>
                </div>
              ) : (
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
              )}

              {/* Mobile User Menu Button */}
              <IconButton
                className="lg:hidden"
                onClick={() => setMobileMenu(true)}
              >
                <User size={22} className="text-gray-600" />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="left"
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              width: 280,
              bgcolor: "background.paper",
            },
          }}
        >
          <Box className="h-full flex flex-col">
            <div className="p-4 flex items-center justify-between border-b">
              <span className="text-xl font-semibold">CycleChala</span>
              <IconButton onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </IconButton>
            </div>

            {isAuthenticated && (
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {userEmail?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{userEmail}</div>
                    <div className="text-sm text-gray-500 capitalize">
                      {userRole}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <MobileMenuItem
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className={isActive(link.path) ? "text-blue-600" : ""}>
                    {link.display}
                  </span>
                </MobileMenuItem>
              ))}
            </div>

            {!isAuthenticated && (
              <div className="p-4 border-t">
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LogIn size={18} />}
                    onClick={() => {
                      router.push("/login");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<User size={18} />}
                    onClick={() => {
                      router.push("/register");
                      setIsMenuOpen(false);
                    }}
                  >
                    Create Account
                  </Button>
                </Stack>
              </div>
            )}
          </Box>
        </Drawer>

        {/* Mobile Auth Dialog */}
        <Dialog
          open={mobileMenu}
          onClose={() => setMobileMenu(false)}
          fullWidth
          maxWidth="xs"
          sx={{
            display: { lg: "none" },
            "& .MuiDialog-paper": {
              borderRadius: "16px",
              margin: "16px",
            },
          }}
        >
          <DialogContent sx={{ padding: "24px" }}>
            {isAuthenticated ? (
              <div>
                {/* User Profile Header */}
                <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {userEmail?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-medium">{userEmail}</div>
                    <div className="text-gray-500 text-sm capitalize">
                      {userRole} Account
                    </div>
                  </div>
                </div>

                <Stack spacing={2}>
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      fullWidth
                      variant="outlined"
                      startIcon={item.icon}
                      onClick={() => {
                        item.onClick();
                        setMobileMenu(false);
                      }}
                      sx={{
                        py: 1.5,
                        px: 3,
                        justifyContent: "flex-start",
                        color:
                          item.label === "Logout"
                            ? "error.main"
                            : "text.primary",
                        borderColor:
                          item.label === "Logout" ? "error.main" : "divider",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.9375rem",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor:
                            item.label === "Logout"
                              ? "error.lighter"
                              : "action.hover",
                          borderColor:
                            item.label === "Logout"
                              ? "error.main"
                              : "primary.main",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Welcome to CycleChala
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Sign in to access your account and preferences
                  </p>
                </div>

                <Stack spacing={2.5}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LogIn size={20} />}
                    onClick={() => {
                      router.push("/login");
                      setMobileMenu(false);
                    }}
                    sx={{
                      py: 1.5,
                      textTransform: "none",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      borderRadius: "10px",
                      borderWidth: "1.5px",
                      color: "primary.main",
                      borderColor: "primary.main",
                      "&:hover": {
                        borderWidth: "1.5px",
                        backgroundColor: "primary.lighter",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<User size={20} />}
                    onClick={() => {
                      router.push("/register");
                      setMobileMenu(false);
                    }}
                    sx={{
                      py: 1.5,
                      textTransform: "none",
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      borderRadius: "10px",
                      boxShadow: "none",
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Create Account
                  </Button>
                </Stack>

                <div className="mt-6 text-center text-sm text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-[70px]" />
    </ThemeProvider>
  );
};

export default Header;
