import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const baseUrl = import.meta.env.VITE_API_URL;


const CreateSlider = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      return toast.error("Title and image required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("link", link);
    formData.append("order", order);
    formData.append("image", image);

    try {
      setLoading(true);
      await api.post("/admin/create/slider", formData);
      toast.success("Slider created");
      navigate("/admin/sliders");
    } catch (err) {
      toast.error("Failed to create slider");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-xl font-semibold mb-4 text-white">
        Create Slider
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Redirect link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Order number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="text-white bg-gray-700 px-3 py-1"
        />

        <button
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          {loading ? "Creating..." : "Create Slider"}
        </button>
      </form>
    </div>
  );
};

export default CreateSlider;
