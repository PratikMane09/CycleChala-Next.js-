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
  Paper,
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
} from "lucide-react";

import { useRouter } from "next/navigation";
import Categories from "./component/Categories";
import Product from "./component/Product";
const DashboardCard = ({ title, icon, count, onClick }) => (
  <Paper
    elevation={0}
    onClick={onClick}
    sx={{
      p: 3,
      borderRadius: 3,
      border: "1px solid #E5E7EB",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        background: "#F8FAFC",
      },
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <Typography variant="h6" className="text-gray-800 font-semibold">
        {title}
      </Typography>
      <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
        {React.cloneElement(icon, {
          className: "text-white",
          sx: { fontSize: 28 },
        })}
      </div>
    </div>
    <Typography variant="h4" className="font-bold text-gray-900">
      {count?.toLocaleString()}
    </Typography>
    <Typography variant="body2" className="text-gray-500 mt-2">
      Click to view details
    </Typography>
  </Paper>
);

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activePage, setActivePage] = useState("dashboard");
  const [counts, setCounts] = useState({
    students: 0,
    owners: 0,
    hostels: 0,
    approvedHostels: 0,
    approvedWishlist: 0,
    pendingWishlist: 0,
  });
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [isLoading, setIsLoading] = useState(true);

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
            position: isMobile ? "fixed" : "relative",
            background: "#FFFFFF",
            borderRight: "1px solid #E5E7EB",
            transition: "width 0.3s ease-in-out",
            overflowX: "hidden",
            padding: "16px 12px",
            height: "100%",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Box className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-8 px-2">
            {drawerOpen && (
              <Typography variant="h6" className="font-bold text-blue-600">
                Admin Panel
              </Typography>
            )}
            <IconButton
              onClick={toggleDrawer}
              className="text-gray-600 hover:bg-gray-100 rounded-full"
              sx={{
                width: 40,
                height: 40,
              }}
            >
              {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>

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
                    "& .MuiListItemIcon-root": {
                      minWidth: drawerOpen ? 48 : 80,
                      justifyContent: "center",
                      color: activePage === item.value ? "#2563EB" : "#64748B",
                    },
                    "& .MuiListItemText-primary": {
                      color: activePage === item.value ? "#2563EB" : "#64748B",
                      fontWeight: activePage === item.value ? 600 : 500,
                    },
                    background:
                      activePage === item.value
                        ? "linear-gradient(90deg, #EEF2FF 0%, #BFDBFE 100%)"
                        : "transparent",
                    "&:hover": {
                      background:
                        activePage === item.value
                          ? "linear-gradient(90deg, #EEF2FF 0%, #BFDBFE 100%)"
                          : "#F8FAFC",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: drawerOpen ? 48 : "auto",
                      mr: drawerOpen ? "auto" : 0,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {drawerOpen && (
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontSize: "0.85rem",
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
          <ListItem
            disablePadding
            sx={{
              mt: 2,
              borderRadius: "12px",
              overflow: "hidden",
              "& .MuiListItemIcon-root": {
                minWidth: 48,
                justifyContent: "center",
                color: "#EF4444",
              },
              "& .MuiListItemText-primary": {
                color: "#EF4444",
                fontWeight: 500,
              },
              "&:hover": {
                backgroundColor: "#FEE2E2",
              },
            }}
          >
            <ListItemButton
              sx={{
                py: 2,
              }}
            >
              <ListItemIcon></ListItemIcon>
              {drawerOpen && (
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      <Box component="main" className="flex-1 overflow-auto bg-gray-50">
        {isMobile && !drawerOpen && (
          <IconButton
            onClick={toggleDrawer}
            sx={{
              m: 1,
              bgcolor: "background.paper",
              boxShadow: 1,
              "&:hover": { bgcolor: "background.paper" },
            }}
          >
            <ChevronRight />
          </IconButton>
        )}

        <Box
          sx={{
            p: { xs: 1, sm: 2 },
            height: "100%",
          }}
        >
          {activePage === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              dashboard
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
