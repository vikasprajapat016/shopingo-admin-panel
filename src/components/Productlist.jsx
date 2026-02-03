import { useEffect, useRef, useState } from "react";
import { fetchFilteredProducts, deleteProduct } from "../api/productApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const baseUrl = import.meta.env.VITE_API_URL;
const LIMIT = 10;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);      // first load only
  const [searching, setSearching] = useState(false); // silent search

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const requestIdRef = useRef(0); // 🔥 prevents race condition

  // 🔹 Debounce input (NO page reset here)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔹 Reset page ONLY when search actually changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // 🔹 Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      const requestId = ++requestIdRef.current;

      try {
        if (debouncedSearch) {
          setSearching(true); // silent
        } else {
          setLoading(true); // first load / pagination
        }

        const res = await fetchFilteredProducts(
          page,
          LIMIT,
          debouncedSearch
        );

        // ❗ Ignore old responses
        if (requestId !== requestIdRef.current) return;

        setProducts(res.data.products);
        setTotalPages(res.data.pagination.totalPages);
        setTotalProducts(res.data.pagination.totalProducts);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
        setSearching(false);
      }
    };

    loadProducts();
  }, [page, debouncedSearch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      setPage(1);
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <p className="text-white">Loading products...</p>;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-white">
          Products ({totalProducts})
        </h1>

        <Link
          to="add"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <FiPlus />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search product by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
        />

        {searching && (
          <span className="text-sm text-gray-400">Searching...</span>
        )}
      </div>

      {/* Empty */}
      {totalProducts === 0 && (
        <p className="text-gray-400 text-center py-10">
          No products found
        </p>
      )}

      {/* Table */}
      {products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-gray-700 text-gray-200">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-right pr-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={`${baseUrl}/${p.thumbnail}` || "/no-image.png"}
                      alt={p.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-white">{p.title}</p>
                      <p className="text-xs text-gray-400">{p.category}</p>
                    </div>
                  </td>

                  <td className="text-center">₹{p.price}</td>
                  <td className="text-center">{p.stock}</td>

                  <td className="p-3 flex justify-end gap-4">
                    <Link
                      to={`edit/${p._id}`}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <FiEdit size={18} />
                    </Link>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-white">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
