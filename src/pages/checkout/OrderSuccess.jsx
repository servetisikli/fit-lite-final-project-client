import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FiCheckCircle, FiHome, FiShoppingBag } from "react-icons/fi";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderNumber, orderTotal, orderItems, customerInfo, shippingAddress } =
    location.state || {};

  useEffect(() => {
    window.scrollTo(window.innerWidth, 0);
  }, []);

  return (
    <div className=" bg-gray-50 flex items-center justify-center mt-20 sm:mt-30 md:mt-40 lg:mt-40 xl:mt-40">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <div className="text-center">
          <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Successful!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been received.
          </p>
          {orderNumber && (
            <p className="text-gray-800 font-medium mb-2">
              Order Number: #{orderNumber}
            </p>
          )}
          {orderTotal && (
            <p className="text-gray-800 font-medium mb-6">
              Total Amount: €{orderTotal}
            </p>
          )}
          <div className="text-left mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Order Details
            </h2>
            <div className="space-y-4">
              {orderItems &&
                orderItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center py-3 border-b"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="text-left mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Customer Information
            </h2>
            <p className="text-gray-600">
              Name: {customerInfo.firstName} {customerInfo.lastName}
            </p>
            <p className="text-gray-600">Email: {customerInfo.email}</p>
            <p className="text-gray-600">Phone: {customerInfo.phone}</p>
          </div>
          <div className="text-left mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Shipping Address
            </h2>
            <p className="text-gray-600">Address: {shippingAddress.address}</p>
            <p className="text-gray-600">City: {shippingAddress.city}</p>
            <p className="text-gray-600">ZIP Code: {shippingAddress.zipCode}</p>
            <p className="text-gray-600">Country: {shippingAddress.country}</p>
          </div>
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg
                hover:bg-blue-700 transition-colors duration-200"
            >
              <FiHome className="inline-block mr-2" />
              Return to Home
            </Link>
            <Link
              to="/orders"
              className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg
                hover:bg-gray-300 transition-colors duration-200"
            >
              <FiShoppingBag className="inline-block mr-2" />
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
