"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Package,
  Truck,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
  User,
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { API_BASE_URL } from "../../../config/api";

const OrderDetailsPage = () => {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const editableStatuses = ["pending", "confirmed"];
  useEffect(() => {
    const orderId = window.location.pathname.split("/").pop();
    fetchOrderDetails(orderId);
  }, []);

  const fetchOrderDetails = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/myorders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setOrderDetails(data.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const convertBinaryToImage = (binaryData, contentType) => {
    const base64String = Buffer.from(binaryData).toString("base64");
    return `data:${contentType};base64,${base64String}`;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="h-5 w-5" />,
      confirmed: <CheckCircle2 className="h-5 w-5" />,
      processing: <RefreshCcw className="h-5 w-5" />,
      shipped: <Truck className="h-5 w-5" />,
      delivered: <Package className="h-5 w-5" />,
      cancelled: <XCircle className="h-5 w-5" />,
    };
    return icons[status] || <AlertCircle className="h-5 w-5" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      confirmed: "bg-blue-50 text-blue-700 border-blue-200",
      processing: "bg-purple-50 text-purple-700 border-purple-200",
      shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
      delivered: "bg-green-50 text-green-700 border-green-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const handleViewDetails = useCallback(
    (slug) => {
      if (slug) router.push(`/products/${slug}`);
    },
    [router]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            Order not found
          </h2>
          <p className="mt-2 text-gray-600">
            The order you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have access to it.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen mt-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push("/order")}
          className="mb-6 inline-flex items-center text-sky-600 hover:text-sky-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Order Header */}
          <div className="border-b border-gray-100 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Order #{orderDetails.orderId.slice(-8)}
                  </h1>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      orderDetails.status
                    )}`}
                  >
                    {getStatusIcon(orderDetails.status)}
                    <span className="capitalize">{orderDetails.status}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(
                    new Date(orderDetails.orderDate),
                    "MMMM d, yyyy 'at' h:mm a"
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  ₹
                  {orderDetails.summary.total.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  {orderDetails.items.length}{" "}
                  {orderDetails.items.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
            <div className="lg:col-span-2 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Items
              </h2>
              <div className="space-y-6">
                {orderDetails.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-full sm:w-32 h-32 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                      {item.product.images && item.product.images[0] ? (
                        <img
                          src={convertBinaryToImage(
                            item.product.images[0].data,
                            item.product.images[0].contentType
                          )}
                          alt={item.product.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Package className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {item.product.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.specifications &&
                          Object.entries(item.specifications).map(
                            ([key, value]) => (
                              <span
                                key={key}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {key}: {value}
                              </span>
                            )
                          )}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </div>
                          <button
                            onClick={() => handleViewDetails(item.product.slug)}
                            className="inline-flex items-center text-sm text-sky-600 hover:text-sky-700 font-medium"
                          >
                            Product Details
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          ₹
                          {(
                            item.price.finalPrice * item.quantity
                          ).toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 bg-gray-50 p-6">
              {/* Shipping Information */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Shipping Information
                </h3>
                <div className="bg-white p-4 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Delivery Address
                      </p>
                      <p className="text-sm text-gray-600">
                        {Object.values(orderDetails.shipping.address).join(
                          ", "
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Shipping Method
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {orderDetails.shipping.method}
                      </p>
                    </div>
                  </div>
                  {orderDetails.shipping.trackingNumber && (
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Tracking Number
                        </p>
                        <p className="text-sm text-gray-600">
                          {orderDetails.shipping.trackingNumber}
                        </p>
                      </div>
                    </div>
                  )}
                  {editableStatuses.includes(orderDetails.status) && (
                    <button
                      onClick={() =>
                        router.push(`/checkout?orderId=${orderDetails.orderId}`)
                      }
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700"
                    >
                      Edit Order
                    </button>
                  )}
                </div>
              </div>

              {/* Billing Information */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Billing Information
                </h3>
                <div className="bg-white p-4 rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Name</p>
                      <p className="text-sm text-gray-600">
                        {orderDetails.billing.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">
                        {orderDetails.billing.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Payment Method
                      </p>
                      <p className="text-sm text-gray-600 uppercase">
                        {orderDetails.payment.method}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Order Summary
                </h3>
                <div className="bg-white p-4 rounded-lg space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      ₹
                      {orderDetails.summary.subtotal.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>
                      ₹
                      {orderDetails.summary.shipping.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  {orderDetails.summary.tax > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax</span>
                      <span>
                        ₹
                        {orderDetails.summary.tax.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  )}
                  {orderDetails.summary.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>
                        -₹
                        {orderDetails.summary.discount.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-base font-semibold text-gray-900">
                      <span>Total</span>
                      <span>
                        ₹
                        {orderDetails.summary.total.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
