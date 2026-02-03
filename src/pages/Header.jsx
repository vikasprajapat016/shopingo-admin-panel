import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-14 bg-gray-900 text-white flex items-center justify-between px-4 lg:px-6 border-b border-gray-800">
      
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-800"
        >
          <FiMenu size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold">
            Shop<span className="text-indigo-500">ingo</span>
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-md hover:bg-gray-800">
          <FiBell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-800"
          >
            <span className="hidden sm:block text-sm font-medium truncate max-w-[120px]">
              {user?.username || "Admin"}
            </span>
            <FiChevronDown size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg overflow-hidden">
              <p className="px-4 py-2 text-xs text-gray-400">
                {user?.role}
              </p>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
