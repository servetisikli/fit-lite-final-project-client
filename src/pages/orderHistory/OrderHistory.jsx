import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

const OrderHistory = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await axios.get(
            "https://fit-lite-final-project-server.onrender.com/api/orders/orders",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setOrders(response.data.data);
        } catch (error) {
          setError("Error fetching orders");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  useEffect(() => {
    window.scrollTo(window.innerWidth, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen container mx-auto px-4 py-8 mt-20 sm:mt-30 md:mt-40 lg:mt-40 xl:mt-40
"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Order History
            </h2>
            <span className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-800">
              Total Orders: {orders.length}
            </span>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No orders
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't placed any orders yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-white font-bold">
                          Order #{order.orderNumber}
                        </span>
                        <span className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm">
                          €{order.totals?.total?.toFixed(2) || "N/A"}
                        </span>
                      </div>
                      <span className="text-blue-100">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-6 space-y-6">
                    {/* Items Section */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Items
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {order.orderItems.map((item) => (
                          <div
                            key={item.productId}
                            className="flex items-center justify-between py-2"
                          >
                            <div className="flex items-center space-x-4">
                              <span className="text-gray-800">{item.name}</span>
                              <span className="text-gray-500">
                                x{item.quantity}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">
                              €{item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Customer and Shipping Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Customer Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Customer Information
                        </h4>
                        <div className="space-y-2 text-gray-600">
                          <p className="flex items-center space-x-2">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span>
                              {order.customerInfo.firstName}{" "}
                              {order.customerInfo.lastName}
                            </span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            <span>{order.customerInfo.email}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            <span>{order.customerInfo.phone}</span>
                          </p>
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Shipping Address
                        </h4>
                        <div className="space-y-2 text-gray-600">
                          <p className="flex items-center space-x-2">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>{order.shippingAddress.address}</span>
                          </p>
                          <p className="ml-7">
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.zipCode}
                          </p>
                          <p className="ml-7">
                            {order.shippingAddress.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
