"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Badge,
  Tooltip,
  useMediaQuery,
  useTheme,
  ListItemButton,
  ListItem,
} from "@mui/material";

import {
  BoxIcon,
  ChartBar,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Bell,
  Search,
  LogOut,
  User,
} from "lucide-react";

import { useRouter } from "next/navigation";
import Categories from "./component/Categories";
import Product from "./component/Product";

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activePage, setActivePage] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  const router = useRouter();

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, value: "dashboard" },
    { name: "Category", icon: <ChartBar />, value: "category" },
    { name: "Product", icon: <BoxIcon />, value: "product" },
  ];

  return (
    <Box className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={drawerOpen}
        onClose={toggleDrawer}
        anchor="left"
        sx={{
          width: drawerOpen ? 280 : 80,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerOpen ? 280 : 80,
            position: isMobile ? "fixed" : "fixed",
            background: "#FFFFFF",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderRight: "1px solid #E5E7EB",
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
            padding: "16px 12px",
            height: "h-full",
            zIndex: 1000,
          },
        }}
      >
        {/* Sidebar Content */}
        <Box className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-8 px-2">
            {drawerOpen && (
              <Typography
                variant="h6"
                className="font-bold text-blue-600 tracking-wider uppercase"
              >
                Admin Panel
              </Typography>
            )}
            <IconButton
              onClick={toggleDrawer}
              className="text-gray-600 hover:bg-gray-100 rounded-full"
              sx={{ width: 40, height: 40 }}
            >
              {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>

          {/* Sidebar Menu Items */}
          <List className="flex-1 space-y-1 px-2">
            {sidebarItems.map((item) => (
              <Tooltip
                key={item.value}
                title={!drawerOpen ? item.name : ""}
                placement="right"
              >
                <ListItemButton
                  onClick={() => setActivePage(item.value)}
                  sx={{
                    borderRadius: "12px",
                    py: 2,
                    px: drawerOpen ? 3 : 1,
                    justifyContent: drawerOpen ? "flex-start" : "center",
                    mb: 0.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(37, 99, 235, 0.1)",
                      transform: "translateX(4px)",
                    },
                    background:
                      activePage === item.value
                        ? "linear-gradient(90deg, #EEF2FF 0%, #BFDBFE 100%)"
                        : "transparent",
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {drawerOpen && (
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontSize: "0.95rem",
                        fontWeight: activePage === item.value ? 600 : 400,
                        color:
                          activePage === item.value ? "#2563EB" : "#64748B",
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            ))}
          </List>

          {/* Logout Section */}
          <ListItem
            disablePadding
            sx={{
              mt: 2,
              borderRadius: "12px",
              "&:hover": { backgroundColor: "#FEE2E2" },
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <LogOut className="text-red-500" />
              </ListItemIcon>
              {drawerOpen && (
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    color: "#EF4444",
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" className=" flex flex-col overflow-hidden">
        {/* Sticky Top Navigation */}
        <Box
          component="nav"
          className="fixed top-0 z-50 bg-white shadow-sm"
          sx={{
            height: "140px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h5"
            className="font-bold text-gray-800 tracking-tight"
          >
            {sidebarItems.find((item) => item.value === activePage)?.name ||
              "Dashboard"}
          </Typography>

          {/* Right Side Actions */}
          <Box className="flex items-center space-x-4">
            {/* Search */}
            <IconButton>
              <Search className="text-gray-600" />
            </IconButton>

            {/* Notifications */}
            <IconButton>
              <Badge badgeContent={4} color="error">
                <Bell className="text-gray-600" />
              </Badge>
            </IconButton>

            {/* User Profile */}
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
              }}
            >
              <User size={20} />
            </Avatar>
          </Box>
        </Box>

        {/* Scrollable Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: { xs: 2, sm: 4 },
            backgroundColor: "#F8FAFC",
          }}
        >
          {activePage === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              Dashboard Content
            </div>
          )}
          {activePage === "category" && <Categories />}
          {activePage === "product" && <Product />}
        </Box>
      </Box>
    </Box>
  );
};

export default function AdminDashboardWrapper() {
  return <AdminDashboard />;
}
