import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const StatCard = ({
  title,
  bg = "bg-gray-800",
  value,
  icon,
  color = "bg-indigo-600 text-white",
  trend,
  loading = false,
  
}) => {
  return (
    <div className={`${bg} rounded-xl p-4 sm:p-5 flex items-center justify-between`}>
      
      {/* LEFT */}
      <div className="flex-1">
        <p className="text-gray-100 text-xs sm:text-sm">
          {title}
        </p>

        {loading ? (
          <div className="h-7 w-24 bg-gray-700 rounded mt-2 animate-pulse" />
        ) : (
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {value ?? "—"}
          </h3>
        )}

    

        {/* TREND */}
        {typeof trend === "number" && !loading && (
          <div
            className={`mt-2 flex items-center text-xs sm:text-sm ${
              trend >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            <span className="ml-1">{Math.abs(trend)}%</span>
            <span className="ml-1 text-gray-300">since last update</span>
          </div>
        )}
      </div>

      {/* ICON */}
      <div className={`text-xl sm:text-2xl p-3 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
