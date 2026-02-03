import { useState } from "react";
import { createProduct } from "../api/productApi";
import toast from "react-hot-toast";
import ProductForm from "../components/ProductForm";

const AddProduct = () => {
  const [values, setValues] = useState({
    title: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    description: "",
  });
  const [file, setFile] = useState(null)

  const handleSubmit = async (e, file) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // append text fields
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // append image file
      if (file) {
        formData.append("thumbnail", file);
      }

      await createProduct(formData);

      toast.success("Product created");

      setValues({
        title: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        description: "",
        setFile: null,
      });
    } catch (err) {
      toast.error("Create failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">
        Add Product
      </h1>

      <ProductForm
        values={values}
        setValues={setValues}
        file={file}
        setFile={setFile}
        onSubmit={handleSubmit}
        buttonText="Create"
      />
    </div>
  );
};

export default AddProduct;
