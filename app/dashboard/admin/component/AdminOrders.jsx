"use client";
import React, { useState } from "react";
import OrderDashboard from "./OrderDashboard";
import OrderDetailsView from "./OrderDetailsView";
import { Box, Fade } from "@mui/material";

const AdminOrders = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'detail'

  // Handler for when an order is clicked
  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
    setViewMode("detail");
  };

  // Handler for returning to the order list
  const handleBackToList = () => {
    setSelectedOrderId(null);
    setViewMode("list");
  };

  // Enhanced OrderDashboard with click handlers
  const EnhancedOrderDashboard = () => {
    const handleRowClick = (orderId) => {
      handleOrderClick(orderId);
    };

    return (
      <Box className="h-full">
        <OrderDashboard onOrderClick={handleRowClick} />
      </Box>
    );
  };

  return (
    <Box className="h-full">
      <Fade in={viewMode === "list"} unmountOnExit>
        <Box className={viewMode === "list" ? "block" : "hidden"}>
          <EnhancedOrderDashboard />
        </Box>
      </Fade>

      <Fade in={viewMode === "detail"} unmountOnExit>
        <Box className={viewMode === "detail" ? "block" : "hidden"}>
          <OrderDetailsView
            orderId={selectedOrderId}
            onBack={handleBackToList}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default AdminOrders;
