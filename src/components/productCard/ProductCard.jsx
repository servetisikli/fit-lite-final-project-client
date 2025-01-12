import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiEye, FiShoppingBag } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { addItem, cart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  // useEffect
  React.useEffect(() => {
    const isItemInCart = cart.items.some((item) => item.id === product._id);
    setIsInCart(isItemInCart);
  }, [cart.items, product._id]);

  const handleAddToCart = async () => {
    if (isInCart) return;

    setIsAddingToCart(true);
    try {
      const cartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: 1,
      };

      addItem(cartItem);
      setIsInCart(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleViewDetail = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group relative"
    >
      {/* Image Container */}
      <div className="relative h-[300px] overflow-hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 z-20 p-3 rounded-full 
          bg-white/30 backdrop-blur-md border border-white/30
          hover:bg-white/50 transition-all duration-300"
        >
          {isFavorite ? (
            <AiFillHeart className="h-5 w-5 text-rose-500" />
          ) : (
            <FiHeart className="h-5 w-5 text-white" />
          )}
        </motion.button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform 
          duration-700 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
        transition-all duration-300 flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDetail}
            className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium
            flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <FiEye className="h-5 w-5" />
            View Details
          </motion.button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col h-[300px]">
        <div className="p-6 flex-1">
          <span
            className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 
          rounded-full mb-4 inline-block"
          >
            {product.category}
          </span>

          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {product.name}
          </h2>

          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Actions Section */}
        <div className="p-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Price</span>
              <span className="text-2xl font-bold text-gray-900">
                €{product.price}
              </span>
            </div>

            <AnimatePresence>
              {isInCart ? (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-6 py-3 rounded-xl
        bg-green-500 text-white font-medium
        flex items-center gap-2 cursor-default"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Added to Cart
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`relative px-6 py-3 rounded-xl overflow-hidden
        bg-gradient-to-r from-purple-600 to-indigo-600
        text-white font-medium shadow-lg shadow-purple-500/30 
        hover:shadow-purple-500/40 transition-all duration-300
        flex items-center gap-2 ${isAddingToCart ? "opacity-75" : ""}`}
                >
                  {isAddingToCart ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 border-2 border-white/30 border-t-white 
            rounded-full animate-spin"
                      />
                      Adding...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiShoppingBag className="h-5 w-5" />
                      Add to Cart
                    </span>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
