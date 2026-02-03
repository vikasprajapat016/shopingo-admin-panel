import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchProductById,
  updateProduct,
} from "../api/productApi";
import ProductForm from "../components/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchProductById(id);
        setValues(res.data.product);
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleSubmit = async (e, file) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // optional image replace
      if (file) {
        formData.append("thumbnail", file);
      }

      await updateProduct(id, formData);

      toast.success("Product updated");
      navigate("/admin/products");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!values) return <p>Product not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">
        Edit Product
      </h1>

      <ProductForm
        values={values}
        setValues={setValues}
        onSubmit={handleSubmit}
        buttonText="Update"
        isEdit
      />
    </div>
  );
};

export default EditProduct;
