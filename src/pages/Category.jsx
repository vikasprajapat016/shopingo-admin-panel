import { useEffect, useState } from "react";
import { fetchCategories, deleteCategory } from "../api/categoryApi";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await fetchCategories();
      setCategories(res.data.categories || []);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      setDeletingId(id);
      await deleteCategory(id);
      toast.success("Category deleted");
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Categories <span className="text-gray-400">({categories.length})</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage all product categories
          </p>
        </div>

        <Link
          to="add"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition"
        >
          <FiPlus size={18} />
          Add Category
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-xl bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && categories.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No categories found. Click <b>Add Category</b> to create one.
        </div>
      )}

      {/* GRID */}
      {!loading && categories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() =>
                navigate(`/admin/categories/products/${cat._id}`)
              }
              className="group bg-gray-800/80 backdrop-blur rounded-xl p-5 border border-gray-700
                         hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10
                         transition cursor-pointer"
            >
              {/* IMAGE */}
              <div className="flex justify-center">
                <img
                  src={`${baseUrl}/${cat.image}`}
                  alt={cat.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-600
                             group-hover:scale-105 transition"
                />
              </div>

              {/* NAME */}
              <h3 className="text-center mt-4 text-lg font-semibold text-white capitalize">
                {cat.name}
              </h3>

              {/* ACTIONS */}
              <div className="flex justify-center gap-6 mt-5">
                <Link
                  to={`edit/${cat._id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-400 hover:text-blue-500 transition"
                  title="Edit"
                >
                  <FaEdit size={18} />
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(cat._id);
                  }}
                  disabled={deletingId === cat._id}
                  className={`text-red-400 hover:text-red-500 transition ${
                    deletingId === cat._id &&
                    "opacity-50 cursor-not-allowed"
                  }`}
                  title="Delete"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
