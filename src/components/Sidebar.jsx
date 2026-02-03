import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBox,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaTruck,
} from "react-icons/fa";
import {
  BiSolidCategory,
  BiSolidOffer,
  BiSolidSlideshow,
} from "react-icons/bi";
import { MdInventory } from "react-icons/md";
import { useAuth } from "../auth/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition
     ${
       location.pathname === path
         ? "bg-indigo-600 text-white"
         : "text-gray-300 hover:bg-gray-700"
     }`;

  return (
    <>
      {/* Backdrop (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50
        h-auto w-64 bg-gray-900 p-5 flex flex-col
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-white mb-8">
          Admin Panel
        </h2>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
            <FaChartBar /> Dashboard
          </Link>

          {(user?.role === "SUPER_ADMIN" || user?.role === "USER_ADMIN") && (
            <Link to="/admin/users" className={linkClass("/admin/users")}>
              <FaUser /> Users
            </Link>
          )}

          {(user?.role === "SUPER_ADMIN" || user?.role === "PRODUCT_ADMIN") && (
            <>
              <Link to="/admin/products" className={linkClass("/admin/products")}>
                <FaBox /> Products
              </Link>

              <Link
                to="/admin/categories"
                className={linkClass("/admin/categories")}
              >
                <BiSolidCategory /> Categories
              </Link>
            </>
          )}

          {(user?.role === "SUPER_ADMIN" || user?.role === "ORDER_ADMIN") && (
            <Link to="/admin/orders" className={linkClass("/admin/orders")}>
              <FaTruck /> Orders
            </Link>
          )}

          <Link to="/admin/offers" className={linkClass("/admin/offers")}>
            <BiSolidOffer /> Offers
          </Link>

          <Link to="/admin/inventory" className={linkClass("/admin/inventory")}>
            <MdInventory /> Inventory
          </Link>

          <Link to="/admin/sliders" className={linkClass("/admin/sliders")}>
            <BiSolidSlideshow /> Sliders
          </Link>
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
