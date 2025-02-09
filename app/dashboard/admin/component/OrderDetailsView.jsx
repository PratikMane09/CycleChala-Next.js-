"use client";
import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Button,
} from "@mui/material";
import {
  LocalShipping,
  Payment,
  Person,
  Assignment,
  Schedule,
  LocationOn,
  ArrowBack,
} from "@mui/icons-material";
import { API_BASE_URL } from "../../../../config/api";

const OrderDetailsView = ({ orderId, onBack }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  console.log("order", orderDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusColors = {
    pending: "warning",
    confirmed: "info",
    processing: "secondary",
    shipped: "info",
    delivered: "success",
    cancelled: "error",
    returned: "default",
  };

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/admin/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        setOrderDetails(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-96">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="mb-4">
        {error}
      </Alert>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const renderProductInfo = (item) => {
    if (!item.product) {
      return (
        <div>
          <Typography variant="subtitle2" className="font-medium text-gray-500">
            Product Unavailable
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Product information not available
          </Typography>
        </div>
      );
    }

    return (
      <div>
        <Typography variant="subtitle2" className="font-medium">
          {item.product.name}
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          {item.product.description}
        </Typography>
      </div>
    );
  };

  const getItemPrice = (item) => {
    return item.price?.basePrice || 0;
  };
  return (
    <div className="space-y-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          variant="outlined"
          className="mb-4"
        >
          Back to Orders
        </Button>
        <Chip
          label={orderDetails.status.toUpperCase()}
          color={statusColors[orderDetails.status]}
          className="text-lg"
        />
      </div>

      <Grid container spacing={4}>
        {/* Order Summary Card */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h5" className="font-bold text-gray-800 mb-4">
                <Assignment className="mr-2 mb-1" />
                Order Summary
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" className="text-gray-600">
                    Order ID
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {orderDetails._id}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" className="text-gray-600">
                    Order Date
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {orderDetails.orderDate}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Products Table */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" className="font-bold text-gray-800 mb-4">
                Ordered Items
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className="bg-gray-50">
                      <TableCell className="font-bold">Product</TableCell>
                      <TableCell className="font-bold">
                        Specifications
                      </TableCell>
                      <TableCell className="font-bold" align="right">
                        Quantity
                      </TableCell>
                      <TableCell className="font-bold" align="right">
                        Price
                      </TableCell>
                      <TableCell className="font-bold" align="right">
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetails.items.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{renderProductInfo(item)}</TableCell>
                        <TableCell>
                          {item.specifications && (
                            <div className="space-y-1">
                              {Object.entries(item.specifications || {}).map(
                                ([key, value]) => (
                                  <Typography key={key} variant="body2">
                                    <span className="font-medium">{key}:</span>{" "}
                                    {value}
                                  </Typography>
                                )
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {item.quantity || 0}
                        </TableCell>
                        <TableCell align="right">
                          ₹{getItemPrice(item).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          ₹
                          {(getItemPrice(item) * (item.quantity || 0)).toFixed(
                            2
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box className="mt-4 p-4 bg-gray-50 rounded">
                <Grid container spacing={2} className="text-right">
                  <Grid item xs={12} md={6} lg={8} />
                  <Grid item xs={12} md={6} lg={4}>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Typography>Subtotal:</Typography>
                        <Typography>
                          ₹{orderDetails.summary.subtotal}
                        </Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography>Shipping:</Typography>
                        <Typography>
                          ₹{orderDetails.summary.shipping}
                        </Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography>Tax:</Typography>
                        <Typography>₹{orderDetails.summary.tax}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography>Discount:</Typography>
                        <Typography>
                          -₹{orderDetails.summary.discount}
                        </Typography>
                      </div>
                      <Divider className="my-2" />
                      <div className="flex justify-between">
                        <Typography variant="h6" className="font-bold">
                          Total:
                        </Typography>
                        <Typography variant="h6" className="font-bold">
                          ₹{orderDetails.summary.total}
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Customer Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography
                variant="h6"
                className="flex items-center font-bold text-gray-800 mb-4"
              >
                <Person className="mr-2" />
                Customer Information
              </Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="subtitle2" className="text-gray-600">
                    Name
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {orderDetails.billing.name}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" className="text-gray-600">
                    Phone
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {orderDetails.billing.phone}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" className="text-gray-600">
                    Billing Address
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {orderDetails.billing?.address?.street}
                    <br />
                    {orderDetails.billing?.address?.city},{" "}
                    {orderDetails.billing?.address?.state}
                    <br />
                    {orderDetails.billing?.address?.country} -{" "}
                    {orderDetails.billing?.address?.zipCode}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipping & Payment */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography
                variant="h6"
                className="flex items-center font-bold text-gray-800 mb-4"
              >
                <LocalShipping className="mr-2" />
                Shipping & Payment
              </Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="subtitle2" className="text-gray-600">
                    Shipping Method
                  </Typography>
                  <Typography
                    variant="body1"
                    className="font-medium capitalize"
                  >
                    {orderDetails.shipping.method}
                  </Typography>
                </div>
                {orderDetails.shipping.trackingNumber && (
                  <div>
                    <Typography variant="subtitle2" className="text-gray-600">
                      Tracking Number
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      {orderDetails.shipping.trackingNumber}
                    </Typography>
                  </div>
                )}
                <div>
                  <Typography variant="subtitle2" className="text-gray-600">
                    Payment Method
                  </Typography>
                  <Typography variant="body1" className="font-medium uppercase">
                    {orderDetails.payment.method}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" className="text-gray-600">
                    Payment Status
                  </Typography>
                  <Chip
                    label={orderDetails.payment.status}
                    color={
                      orderDetails.payment.status.includes("collected")
                        ? "success"
                        : "warning"
                    }
                    size="small"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Delivery Attempts */}
        {orderDetails.shipping.deliveryAttempts?.length > 0 && (
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardContent>
                <Typography
                  variant="h6"
                  className="flex items-center font-bold text-gray-800 mb-4"
                >
                  <Schedule className="mr-2" />
                  Delivery Attempts
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow className="bg-gray-50">
                        <TableCell className="font-bold">Date</TableCell>
                        <TableCell className="font-bold">Status</TableCell>
                        <TableCell className="font-bold">Notes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderDetails.shipping.deliveryAttempts.map(
                        (attempt, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{formatDate(attempt.date)}</TableCell>
                            <TableCell>
                              <Chip
                                label={attempt.status}
                                color={
                                  attempt.status === "delivered"
                                    ? "success"
                                    : "default"
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{attempt.notes}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default OrderDetailsView;
