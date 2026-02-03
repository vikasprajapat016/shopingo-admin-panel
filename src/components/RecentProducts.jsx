import React from "react";
import { FaBox } from "react-icons/fa";

const RecentProducts = ({ products = [] }) => {

  const baseUrl = import.meta.env.VITE_API_URL; 
  return (
    <div className="bg-gray-500 p-5 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <FaBox className="text-purple-600" />
        Recent Products
      </h3>

      {products.length === 0 ? (
        <p className="text-gray-400 text-sm">No recent products</p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li
              key={product._id}
              className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
            >
              {/* Left: Image + Title */}
              <div className="flex items-center gap-3">
                
                {console.log(product.thumbnail)}
                <img

          src={`${baseUrl}/${product.thumbnail}`}
                  alt={product.title}
                  className="w-10 h-10 rounded-md object-cover"
                />

                <div>
                  <p className="text-gray-200 text-sm font-medium">
                    {product.title}
                  </p>
                  <p className="text-gray-300 text-xs">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right: Price + Stock */}
              <div className="text-right">
                <p className="text-gray-200 text-sm font-semibold">
                  ₹{product.price}
                </p>

                <span
                  className={`text-xs font-medium ${
                    product.stock > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentProducts;
