import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

const AdminSliders = () => {
  const [sliders, setSliders] = useState([]);
  const [tab, setTab] = useState("active");
  const [loading, setLoading] = useState(true);

  const loadSliders = async () => {
    try {
      const res = await api.get("/admin/sliders");
      setSliders(res.data.sliders);
    } catch {
      toast.error("Failed to load sliders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSliders();
  }, []);

  const toggleStatus = async (id, status) => {
    try {
      await api.put(`/admin/slider/update/${id}`, {
        isActive: !status,
      });
      loadSliders();
    } catch {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slider?")) return;
    try {
      await api.delete(`/admin/slider/delete/${id}`);
      toast.success("Slider deleted");
      loadSliders();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredSliders = sliders.filter(
    (s) => s.isActive === (tab === "active")
  );

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl text-white mb-4">Manage Sliders</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["active", "inactive"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${
              tab === t
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {t === "active" ? "Active Sliders" : "Inactive Sliders"}
          </button>
        ))}
      </div>

      {filteredSliders.length === 0 && (
        <p className="text-gray-400">No sliders found</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSliders.map((s) => (
          <div key={s._id} className="bg-gray-800 rounded-lg shadow">
            <img
              src={`${baseUrl}/${s.image}`}
              alt={s.title}
              className="h-40 w-full object-cover rounded-t-lg"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-white font-medium">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.subtitle}</p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => toggleStatus(s._id, s.isActive)}
                  className={`px-3 py-1 rounded text-sm cursor-pointer ${
                    s.isActive ? "bg-green-600" : "bg-yellow-600"
                  } text-white`}
                >
                  {s.isActive ? "Active" : "Inactive"}
                </button>

                <div className="flex gap-3">
                 <Link to={`/admin/sliders/edit/${s._id}`} className="text-blue-400 cursor-pointer">
  <FiEdit size={18} />
</Link>

                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-red-400 cursor-pointer"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSliders;
