import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import { FiGrid, FiList, FiSliders } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
  ];

  async function fetchProducts() {
    let response;
    try {
      setIsLoading(true);
      if (searchParams.has("cat")) {
        response = await axios.get(
          `https://fit-lite-final-project-server.onrender.com/api/products/category/${searchParams.get(
            "cat"
          )}`
        );
      } else {
        response = await axios.get(
          "https://fit-lite-final-project-server.onrender.com/api/products"
        );
      }

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();

    /* const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://fit-lite-final-project-server.onrender.com/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts(); */
  }, []);

  // Sort products based on selected option
  const getSortedProducts = () => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sortedProducts; // 'newest' is default
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-24 sm:mt-30 md:mt-40 lg:mt-40 xl:mt-40">
      {/* Header and Controls */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start 
      sm:items-center space-y-4 sm:space-y-0 mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          {searchParams.has("cat")
            ? `${searchParams.get("cat")} Products`
            : "Our Products"}
        </h1>

        <div className="flex items-center space-x-4">
          {/* View Type Toggles */}
          <div className="flex items-center space-x-2 border rounded-lg p-1">
            <button
              onClick={() => setViewType("grid")}
              className={`p-1.5 rounded transition-colors duration-200 ${
                viewType === "grid"
                  ? "bg-customPurple text-white"
                  : "text-gray-600 hover:text-customPurple"
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewType("list")}
              className={`p-1.5 rounded transition-colors duration-200 ${
                viewType === "list"
                  ? "bg-customPurple text-white"
                  : "text-gray-600 hover:text-customPurple"
              }`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 text-gray-600 focus:outline-none 
            focus:ring-2 focus:ring-customPurple"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid/List */}
      <div
        className={
          viewType === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {getSortedProducts().map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            viewType={viewType}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
