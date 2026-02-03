import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const CategoryForm = ({
  name,
  setName,
  file,
  setFile,
  loading,
  buttonText,
  image,          // existing image for edit mode
  handleSubmit,
  fileInputRef,
}) => {
  const [preview, setPreview] = useState("");

  // Update preview when file or image changes
  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else if (image) {
      setPreview(`${import.meta.env.VITE_API_URL}/${image}`);
    } else {
      setPreview("");
    }

    // Clean up memory when component unmounts or file changes
    return () => {
      if (file) URL.revokeObjectURL(file);
    };
  }, [file, image]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Optional: validate image type/size
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    setFile(selectedFile);
  };

  return (
    <div className="bg-gray-500 rounded-xl p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-700 p-6 rounded-lg shadow max-w-2xl space-y-5"
      >
        {/* Category name */}
        <div>
          <label className="text-sm text-gray-300 mb-1 block">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image upload */}
        <div>
          <label className="text-sm text-gray-300 mb-1 block">
            Category Image
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded mt-1"
          />

          {/* Preview */}
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
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
        >
          <FaPlus size={18} />
          {loading ? "Saving..." : buttonText}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
