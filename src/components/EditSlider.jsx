import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getSliderById,
  updateSlider,
} from "../api/slider.js";

const baseUrl = import.meta.env.VITE_API_URL;

const EditSlider = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    link: "",
    position: "",
    image: null,
  });

  /* LOAD SLIDER */
  useEffect(() => {
    const loadSlider = async () => {
      try {
        const res = await getSliderById(id);
        const slider = res.data.slider;

        setFormData({
          title: slider.title || "",
          subtitle: slider.subtitle || "",
          link: slider.link || "",
          position: slider.position || "",
          image: null,
        });

        setImagePreview(`${baseUrl}/${slider.image}`);
      } catch {
        toast.error("Failed to load slider");
      } finally {
        setLoading(false);
      }
    };

    loadSlider();
  }, [id]);

  /* HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("link", formData.link);
      data.append("position", formData.position);

      if (formData.image) {
        data.append("image", formData.image);
      }

      await updateSlider(id, data);
      toast.success("Slider updated");
      navigate("/admin/sliders");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <p className="text-white">Loading slider...</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl text-white mb-4">Edit Slider</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Redirect Link"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="number"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        {/* Image Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-40 w-full object-cover rounded"
          />
        )}

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Update Slider
        </button>
      </form>
    </div>
  );
};

export default EditSlider;
