import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useCart } from "../../contexts/CartContext";
import { FiShoppingBag, FiUser, FiTruck, FiCreditCard } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import paypal from "../../assets/logos/Paypal.png";
import klarna from "../../assets/logos/Klarna.png";
import ApplePay from "../../assets/logos/ApplePay.png";
import GooglePay from "../../assets/logos/GooglePay.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext"; // UserContext'i içe aktarın

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useContext(UserContext); // Kullanıcı bilgilerini alın
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: user ? user.firstName : "",
    lastName: "",
    email: user ? user.email : "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (!cart.items.length && location.pathname !== "/order-success") {
  //     // Redirect to cart if empty and not on order-success page
  //     window.location.href = "/cart";
  //   }
  // }, [cart, location.pathname]);

  const steps = [
    { id: 1, title: "Personal Info", icon: <FiUser /> },
    { id: 2, title: "Shipping", icon: <FiTruck /> },
    { id: 3, title: "Payment", icon: <FiCreditCard /> },
  ];

  const calculateTotals = () => {
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    return {
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + shipping + tax).toFixed(2),
    };
  };

  const validateForm = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Email is invalid";
        if (!formData.phone) newErrors.phone = "Phone is required";
        break;
      case 2:
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
        if (!formData.country) newErrors.country = "Country is required";
        break;
      case 3:
        if (!formData.cardNumber)
          newErrors.cardNumber = "Card number is required";
        if (!formData.expiryDate)
          newErrors.expiryDate = "Expiry date is required";
        if (!formData.cvv) newErrors.cvv = "CVV is required";
        if (!formData.cardName) newErrors.cardName = "Card name is required";
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleStepChange = (step) => {
    if (step > currentStep) {
      if (validateForm(currentStep)) {
        setCurrentStep(step);
      }
    } else {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(3)) return;

    setIsLoading(true);
    const totals = calculateTotals();

    try {
      const orderData = {
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        orderItems: cart.items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        paymentInfo: {
          method: "credit_card",
          status: "pending",
        },
        totals,
      };

      const config = user
        ? {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        : {};

      const response = await axios.post(
        "https://fit-lite-final-project-server.onrender.com/api/orders/orders",
        orderData,
        config
      );

      if (response.data.success) {
        clearCart();
        navigate("/order-success", {
          state: {
            orderNumber: response.data.data._id,
            orderTotal: totals.total,
            orderItems: cart.items,
            customerInfo: formData,
            shippingAddress: formData,
          },
        });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between mb-8">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex flex-col items-center flex-1 ${
            currentStep >= step.id ? "text-blue-600" : "text-gray-400"
          }`}
          onClick={() => handleStepChange(step.id)}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
              ${
                currentStep >= step.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
          >
            {step.icon}
          </div>
          <span className="text-sm">{step.title}</span>
        </div>
      ))}
    </div>
  );

  const renderFormField = (name, label, type = "text", placeholder = "") => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
          ${
            errors[name]
              ? "border-red-500 focus:ring-red-200"
              : "focus:ring-blue-200 border-gray-300"
          }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-20 sm:mt-30 md:mt-40 lg:mt-40 xl:mt-40">
      <div className="max-w-4xl mx-auto px-4">
        {/* Order Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 mb-20">
          <div className="flex items-center mb-6">
            <FiShoppingBag className="text-2xl text-gray-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
          </div>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
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
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="space-y-2 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${calculateTotals().subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${calculateTotals().shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${calculateTotals().tax}</span>
              </div>
              <div className="flex justify-between pt-4 border-t font-bold text-lg">
                <span>Total</span>
                <span>${calculateTotals().total}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderStepIndicator()}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info Step */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderFormField("firstName", "First Name")}
                  {renderFormField("lastName", "Last Name")}
                  {renderFormField("email", "Email", "email")}
                  {renderFormField("phone", "Phone", "tel")}
                </div>
              </div>
            )}

            {/* Shipping Step */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Shipping Address
                </h2>
                <div className="space-y-6">
                  {renderFormField("address", "Street Address")}
                  {renderFormField("city", "City")}
                  {renderFormField("zipCode", "ZIP Code")}
                  {renderFormField("country", "Country")}
                </div>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Payment Details
                </h2>
                <div className="space-y-6">
                  {renderFormField(
                    "cardName",
                    "Name on Card",
                    "text",
                    "John Doe"
                  )}
                  {renderFormField(
                    "cardNumber",
                    "Card Number",
                    "text",
                    "1234 5678 9012 3456"
                  )}
                  <div className="grid grid-cols-2 gap-6">
                    {renderFormField(
                      "expiryDate",
                      "Expiry Date",
                      "text",
                      "MM/YY"
                    )}
                    {renderFormField("cvv", "CVV", "text", "123")}
                  </div>
                  <div className="flex flex-col items-start gap-4 p-6 bg-gray-100 rounded-lg shadow-md">
                    {/* PayPal Option */}
                    <label className="flex items-center gap-4 cursor-pointer">
                      <input type="radio" name="payment" value="paypal" />
                      <NavLink
                        to="https://www.paypal.com/signin"
                        target="_blank"
                        rel="noreferer"
                      >
                        <img
                          src={paypal}
                          className="h-11 w-auto rounded-md peer-checked:ring-2 peer-checked:ring-blue-500"
                        />
                      </NavLink>
                    </label>

                    {/* Klarna Option */}
                    <label className="flex items-center gap-4 cursor-pointer">
                      <input type="radio" name="payment" value="klarna" />
                      <NavLink
                        to="https://app.klarna.com/login"
                        target="_blank"
                        rel="noreferer"
                      >
                        <img
                          src={klarna}
                          className="h-11 w-auto rounded-md peer-checked:ring-2 peer-checked:ring-pink-500"
                        />
                      </NavLink>
                    </label>
                    {/* Google Pay Option */}
                    <label className="flex items-center gap-4 cursor-pointer">
                      <input type="radio" name="payment" value="google-pay" />
                      <NavLink
                        to="https://pay.google.com"
                        target="_blank"
                        rel="noreferer"
                      >
                        <img
                          src={GooglePay}
                          className="h-11 w-auto rounded-md peer-checked:ring-2 peer-checked:ring-green-500"
                        />
                      </NavLink>
                    </label>
                    {/* Apple Pay Option */}
                    <label className="flex items-center gap-4 cursor-pointer">
                      <input type="radio" name="payment" value="apple-pay" />
                      <NavLink
                        to="https://www.apple.com/apple-pay/"
                        target="_blank"
                        rel="noreferer"
                      >
                        <img
                          src={ApplePay}
                          className="h-11 w-auto rounded-md peer-checked:ring-2 peer-checked:ring-gray-800"
                        />
                      </NavLink>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => handleStepChange(currentStep - 1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => handleStepChange(currentStep + 1)}
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`ml-auto px-6 py-2 bg-green-600 text-white rounded-lg
                    ${
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-green-700"
                    }`}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
