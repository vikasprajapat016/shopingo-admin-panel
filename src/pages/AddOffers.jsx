import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import OfferCard from "../components/OfferCard"

const baseUrl = import.meta.env.VITE_API_URL;


const AdminCreateOffer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    discountType: "percentage",
    discountValue: "",
    categories: [],
    minCartValue: 0,
    expiryDate: "",
    isActive: true,
  });

  const [bannerImage, setBannerImage] = useState(null);

  // 🔹 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/admin/category`,
          { withCredentials: true }
        );
        setCategories(data.categories || data);
      } catch (err) {
        console.log("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Handle category select (multi)
  const toggleCategory = (id) => {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter(c => c !== id)
        : [...prev.categories, id],
    }));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bannerImage) {
      return toast.error("Banner image is required");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      });

      formData.append("bannerImage", bannerImage);

      await axios.post(
        `${baseUrl}/admin/create/offers`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Offer created successfully 🎉");

      // reset
      setForm({
        title: "",
        discountType: "percentage",
        discountValue: "",
        categories: [],
        minCartValue: 0,
        startDate: "",
        expiryDate: "",
        isActive: true,
      });
      setBannerImage(null);

    } catch (err) {
      toast.error(err.response?.data?.message || "Offer creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Create Category Offer</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Offer Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Discount Type */}
        <select
          name="discountType"
          value={form.discountType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="percentage">Percentage</option>
          <option value="flat">Flat</option>
        </select>

        {/* Discount Value */}
        <input
          type="number"
          name="discountValue"
          placeholder="Discount Value"
          value={form.discountValue}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Min Cart Value */}
        <input
          type="number"
          name="minCartValue"
          placeholder="Minimum Cart Value"
          value={form.minCartValue}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Categories */}
        <div>
          <p className="font-semibold mb-2">Applicable Categories</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <label key={cat._id} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={form.categories.includes(cat._id)}
                  onChange={() => toggleCategory(cat._id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>


        <div className="flex gap-4">
          
            {/*Start date */}
        
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />



        {/* Expiry Date */}
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        </div>

        {/* Banner Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBannerImage(e.target.files[0])}
          className="w-full"
          required
        />

        {/* Active */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Create Offer"}
        </button>

      </form>
    </div>



      <OfferCard/>

      </>
  );
};

export default AdminCreateOffer;
