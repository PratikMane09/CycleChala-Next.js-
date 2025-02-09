"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  MapPin,
  Truck,
  Package,
  Calendar,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const CombinedCheckoutOrdersPage = () => {
  const router = useRouter();
  const { items, metadata, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("checkout");

  const [formData, setFormData] = useState({
    billingAddress: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    },
    shippingAddress: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    },
    sameAsBilling: true,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const toggleSameAsBilling = () => {
    setFormData((prev) => ({
      ...prev,
      sameAsBilling: !prev.sameAsBilling,
      shippingAddress: !prev.sameAsBilling
        ? prev.billingAddress
        : {
            name: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            phone: "",
          },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          billingAddress: formData.billingAddress,
          shippingAddress: formData.sameAsBilling
            ? formData.billingAddress
            : formData.shippingAddress,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Order placed successfully!");
        clearCart();
        fetchOrders(); // Refresh orders list
        setActiveTab("orders"); // Switch to orders tab
      } else {
        toast.error(data.message || "Error placing order");
      }
    } catch (error) {
      toast.error("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("checkout")}
            className={`pb-4 px-4 text-lg font-semibold border-b-2 transition-colors ${
              activeTab === "checkout"
                ? "border-sky-600 text-sky-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            New Repair Order
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-4 px-4 text-lg font-semibold border-b-2 transition-colors ${
              activeTab === "orders"
                ? "border-sky-600 text-sky-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Order History
          </button>
        </div>

        {activeTab === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Repair Order Details
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="text-sky-600" size={24} />
                      Billing Address
                    </h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                          value={formData.billingAddress.name}
                          onChange={(e) =>
                            handleInputChange(
                              "billingAddress",
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                          value={formData.billingAddress.phone}
                          onChange={(e) =>
                            handleInputChange(
                              "billingAddress",
                              "phone",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Street Address
                        </label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                          value={formData.billingAddress.street}
                          onChange={(e) =>
                            handleInputChange(
                              "billingAddress",
                              "street",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                          value={formData.billingAddress.city}
                          onChange={(e) =>
                            handleInputChange(
                              "billingAddress",
                              "city",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                          value={formData.billingAddress.state}
                          onChange={(e) =>
                            handleInputChange(
                              "billingAddress",
                              "state",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          required
                          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                          value={formData.billingAddress.zipCode}
                          onChange={(e) =>
                            handleInputChange(
                              "billingAddress",
                              "zipCode",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Truck className="text-sky-600" size={24} />
                        Shipping Address
                      </h3>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.sameAsBilling}
                          onChange={toggleSameAsBilling}
                          className="rounded border-gray-300 text-sky-600"
                        />
                        <span className="text-sm text-gray-600">
                          Same as billing
                        </span>
                      </label>
                    </div>
                    {!formData.sameAsBilling && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            value={formData.shippingAddress.name}
                            onChange={(e) =>
                              handleInputChange(
                                "shippingAddress",
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            value={formData.shippingAddress.phone}
                            onChange={(e) =>
                              handleInputChange(
                                "shippingAddress",
                                "phone",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Street Address
                          </label>
                          <input
                            type="text"
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            value={formData.shippingAddress.street}
                            onChange={(e) =>
                              handleInputChange(
                                "shippingAddress",
                                "street",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <input
                            type="text"
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            value={formData.shippingAddress.city}
                            onChange={(e) =>
                              handleInputChange(
                                "shippingAddress",
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            State
                          </label>
                          <input
                            type="text"
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            value={formData.shippingAddress.state}
                            onChange={(e) =>
                              handleInputChange(
                                "shippingAddress",
                                "state",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                            value={formData.shippingAddress.zipCode}
                            onChange={(e) =>
                              handleInputChange(
                                "shippingAddress",
                                "zipCode",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-sky-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-sky-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? "Processing..." : "Place Repair Order"}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-4 h-fit">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between"
                    >
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ₹{item.price.finalPrice.toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{metadata.subtotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>₹{metadata.shipping?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>₹{metadata.tax?.toFixed(2)}</span>
                    </div>
                    {metadata.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{metadata.discount?.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>₹{metadata.total?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recent Orders
              </h2>
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="border-b last:border-0 py-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderId.slice(-8)}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(order.orderDate), "PPP")}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push(`/orders/${order.orderId}`)}
                      className="mt-4 md:mt-0 flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedCheckoutOrdersPage;
