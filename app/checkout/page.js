"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { ArrowLeft, Truck, MapPin, Phone } from "lucide-react";
import { API_BASE_URL } from "../../config/api";

const CheckoutContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, metadata, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [originalOrder, setOriginalOrder] = useState(null);

  const [formData, setFormData] = useState({
    billingAddress: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      country: "",
    },
    shippingAddress: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      country: "",
    },
    sameAsBilling: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      router.push("/login");
      return;
    }

    const orderId = searchParams.get("orderId");
    if (orderId) {
      fetchOrderDetails(orderId, token);
    }
  }, []);

  const fetchOrderDetails = async (orderId, token) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        setIsUpdating(true);
        setOriginalOrder(data.data);

        // Populate form with existing order data
        setFormData({
          billingAddress: {
            name: data.data.billing.name || "",
            street: data.data.billing.address.street || "",
            city: data.data.billing.address.city || "",
            state: data.data.billing.address.state || "",
            zipCode: data.data.billing.address.zipCode || "",
            country: data.data.billing.address.country || "",
            phone: data.data.billing.phone || "",
          },
          shippingAddress: {
            name: data.data.shipping.name || "",
            street: data.data.shipping.address.street || "",
            city: data.data.shipping.address.city || "",
            state: data.data.shipping.address.state || "",
            zipCode: data.data.shipping.address.zipCode || "",
            country: data.data.shipping.address.country || "",
            phone: data.data.shipping.phone || "",
          },
          sameAsBilling: false,
        });
      } else {
        toast.error("Error fetching order details");
      }
    } catch (error) {
      toast.error("Error fetching order details");
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
      const url = isUpdating
        ? `${API_BASE_URL}/api/users/orders`
        : `${API_BASE_URL}/api/users/orders`;

      const method = isUpdating ? "POST" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          billingAddress: formData.billingAddress,
          shippingAddress: formData.sameAsBilling
            ? formData.billingAddress
            : formData.shippingAddress,
          orderId: isUpdating ? originalOrder._id : undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          isUpdating
            ? "Order updated successfully!"
            : "Order placed successfully!"
        );
        if (!isUpdating) {
          clearCart();
        }
        router.push("/order");
      } else {
        toast.error(
          data.message || `Error ${isUpdating ? "updating" : "placing"} order`
        );
      }
    } catch (error) {
      toast.error(`Error ${isUpdating ? "updating" : "placing"} order`);
    } finally {
      setLoading(false);
    }
  };

  if (!isUpdating && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-gray-600">
            Add some items to your cart before checking out
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 inline-flex items-center gap-2 text-sky-600 hover:text-sky-700"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {isUpdating ? "Update Order" : "Checkout"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Billing Address */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="text-sky-600" size={20} />
                  Billing Address
                </h2>
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
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                      value={formData.billingAddress.country}
                      onChange={(e) =>
                        handleInputChange(
                          "billingAddress",
                          "country",
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
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Truck className="text-sky-600" size={20} />
                    Shipping Address
                  </h2>
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
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Shipping address fields */}
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
                className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 disabled:opacity-50"
              >
                {loading
                  ? isUpdating
                    ? "Updating Order..."
                    : "Placing Order..."
                  : isUpdating
                  ? "Update Order"
                  : "Place Order (Cash on Delivery)"}
              </button>
            </form>
          </div>

          {!isUpdating && (
            <div className="lg:sticky mt-10 lg:top-4 h-fit">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
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
          )}
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
