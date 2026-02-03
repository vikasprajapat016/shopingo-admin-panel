import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminProductsByCategory = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/admin/products/category/${categoryId}`, {
      withCredentials: true,
    })
      .then(res => setProducts(res.data.products))
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {products.length === 0 && (
        <p className="text-gray-500">No products in this category</p>
      )}

      <div className="grid grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-3 rounded">
            <img
              src={`${baseUrl}/${p.thumbnail}`}
              className="h-32 w-full object-contain"
            />
            <h2 className="font-semibold mt-2">{p.title}</h2>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsByCategory;
