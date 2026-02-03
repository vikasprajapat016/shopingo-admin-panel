import { useState, useEffect, useCallback } from "react";
import { fetchCategories } from "../api/categoryApi";

const ProductForm = ({
  values,
  file,
  setFile,
  setValues,
  onSubmit,
  buttonText,
  imagePreview, // optional (edit mode)
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(imagePreview || "");

  /* ===============================
     Fetch categories (real-world)
  =============================== */
  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchCategories();
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  /* ===============================
     Input handlers
  =============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Basic image validation (real-world)
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  /* ===============================
     Cleanup preview URL (important)
  =============================== */
  useEffect(() => {
    return () => {
      if (preview && file) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, file]);

  /* ===============================
     Submit wrapper
  =============================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.title || !values.price || !values.category) {
      alert("Please fill all required fields");
      return;
    }

    onSubmit(e, file);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow max-w-2xl space-y-5"
    >
      <h2 className="text-xl font-semibold text-white">
        Product Details
      </h2>

      {/* Inputs */}
      {[
        { name: "title", label: "Title" },
        { name: "price", label: "Price", type: "number" },
        { name: "stock", label: "Stock", type: "number" },
        { name: "brand", label: "Brand" },
      ].map((field) => (
        <div key={field.name}>
          <label className="text-sm text-gray-300">
            {field.label}
          </label>
          <input
            type={field.type || "text"}
            name={field.name}
            value={values[field.name] || ""}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}

      {/* Category */}
      <div>
        <label className="text-sm text-gray-300">
          Category
        </label>
        <select
          name="category"
          value={values.category || ""}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded mt-1"
          disabled={loading}
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-400 text-sm mt-1">{error}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          value={values.description || ""}
          onChange={handleChange}
          rows={4}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded mt-1 resize-none"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="text-sm text-gray-300">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded mt-1"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-32 h-32 object-cover rounded border border-gray-600"
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded"
      >
        {loading ? "Loading..." : buttonText}
      </button>
    </form>
  );
};

export default ProductForm;
