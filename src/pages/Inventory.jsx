import { useEffect, useState } from "react";
import { FaEdit, FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";
import { inventoryProducts, updateProductStock } from "../api/productApi";

const LOW_STOCK_LIMIT = 5;
const baseUrl = import.meta.env.VITE_API_URL;

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [stockValue, setStockValue] = useState(0);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const loadProducts = async (pageNo) => {
    try {
      const res = await inventoryProducts(pageNo, 8);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch {
      toast.error("Failed to load inventory");
    }
  };

  const handleSave = async (id) => {
    try {
      await updateProductStock(id, { stock: stockValue });
      toast.success("Stock updated");
      setEditingId(null);
      loadProducts(page);
    } catch {
      toast.error("Update failed");
    }
  };

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Low Stock Inventory</h2>

      <input
        placeholder="Search product..."
        className="border px-3 py-2 mb-6 w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map(p => {
          const low = p.stock <= LOW_STOCK_LIMIT;

          return (
            <div
              key={p._id}
              className={`border rounded p-4 relative ${
                low ? "border-red-500 bg-red-50" : ""
              }`}
            >
              {low && (
                <span className="absolute top-2 right-2 text-red-600 flex gap-1 text-sm">
                  <FaExclamationTriangle /> Low
                </span>
              )}

              {/* ✅ FIXED IMAGE FIELD */}
              <img
                src={`${baseUrl}/${p.thumbnail}`}
                className="h-40 w-full object-cover mb-3"
              />

              <h3 className="font-semibold">{p.title}</h3>
              <p>₹{p.price}</p>

              <div className="mt-2">
                Stock:
                {editingId === p._id ? (
                  <input
                    type="number"
                    value={stockValue}
                    onChange={(e) => setStockValue(+e.target.value)}
                    className="border ml-2 w-20 px-1"
                  />
                ) : (
                  <span className="ml-2 font-bold">{p.stock}</span>
                )}
              </div>

              {editingId === p._id ? (
                <button
                  onClick={() => handleSave(p._id)}
                  className="bg-green-600 text-white w-full mt-3 py-1"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(p._id);
                    setStockValue(p.stock);
                  }}
                  className="bg-blue-600 text-white w-full mt-3 py-1 flex justify-center gap-2"
                >
                  <FaEdit /> Update
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* ✅ PAGINATION */}
      {pagination && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-1 border disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-1 border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
