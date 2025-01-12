import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiShare2 } from "react-icons/fi";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../../contexts/CartContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://fit-lite-final-project-server.onrender.com/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Failed to load product. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    try {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity,
      };

      addItem(cartItem);
      setShowSuccess(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customPurple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24 sm:mt-30 md:mt-40 lg:mt-40 xl:mt-40">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Image */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.stock <= 5 && product.stock > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Only {product.stock} left!
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:w-1/2 space-y-6">
            {/* Category */}
            <div className="inline-block px-3 py-1 bg-purple-100 text-customPurple rounded-full text-sm font-medium">
              {product.category}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-gray-900">
                €{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 rounded-l-lg"
                  disabled={quantity <= 1}
                >
                  <AiOutlineMinus />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="p-2 hover:bg-gray-100 rounded-r-lg"
                  disabled={quantity >= product.stock}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl
                  ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : isAddingToCart || showSuccess
                      ? "bg-green-500"
                      : "bg-customPurple hover:bg-opacity-90"
                  } 
                  text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                {isAddingToCart ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Adding to Cart...</span>
                  </>
                ) : showSuccess ? (
                  <span>Added to Cart! ✓</span>
                ) : (
                  <>
                    <FiShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </motion.button>

              <button
                className="flex-1 sm:flex-none px-6 py-3 border-2 border-customPurple 
                text-customPurple rounded-lg hover:bg-customPurple hover:text-white 
                transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <FiHeart className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </button>
            </div>

            {/* Additional Features */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiShare2 className="h-5 w-5 text-customPurple" />
                <span>Share this product</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
