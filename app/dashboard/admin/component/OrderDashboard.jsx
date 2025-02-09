"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Refresh,
} from "@mui/icons-material";
import { API_BASE_URL } from "../../../../config/api";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  returned: "bg-gray-100 text-gray-800",
};

// Add onOrderClick prop here with a default empty function
const OrderDashboard = ({ onOrderClick = () => {} }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Rest of your existing functions remain the same
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/admin/orders?page=${currentPage}&limit=10${
          statusFilter ? `&status=${statusFilter}` : ""
        }${searchTerm ? `&search=${searchTerm}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        setOrders(data.data.orders);
        setTotalPages(data.data.pagination.pages);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showSnackbar("Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (data.success) {
        showSnackbar("Order status updated successfully", "success");
        fetchOrders();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter, searchTerm]);

  return (
    <div className="bg-white mt-10 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <Typography variant="h4" className="text-gray-800 font-bold mb-4">
          Order Management
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search className="text-gray-400 mr-2" />,
            }}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Filter by Status"
            >
              <MenuItem value="">All Status</MenuItem>
              {Object.keys(statusColors).map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Refresh />}
            onClick={fetchOrders}
            className="h-full"
          >
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <Paper className="overflow-hidden">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell className="font-bold">Order ID</TableCell>
                  <TableCell className="font-bold">Customer</TableCell>
                  <TableCell className="font-bold">Items</TableCell>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">Status</TableCell>
                  <TableCell className="font-bold">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    hover
                    onClick={() => onOrderClick(order._id)}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{order._id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.billing.name}</p>
                        <p className="text-gray-500 text-sm">
                          {order.billing.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{order.items.length} items</TableCell>
                    <TableCell className="font-medium">
                      ₹{order.summary.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <FormControl
                        fullWidth
                        size="small"
                        onClick={(e) => e.stopPropagation()} // Prevent row click when changing status
                      >
                        <Select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order._id, e.target.value)
                          }
                        >
                          {Object.keys(statusColors).map((status) => (
                            <MenuItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex items-center justify-between p-4 border-t">
            <Typography variant="body2" className="text-gray-600">
              Page {currentPage} of {totalPages}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                startIcon={<ChevronLeft />}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                endIcon={<ChevronRight />}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </Paper>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OrderDashboard;
