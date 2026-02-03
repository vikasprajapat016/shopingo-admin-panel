import api from "./axios.js";

export const fetchProducts = (page = 1, limit = 10) => {
  return api.get(`/admin/products`, {
    params: { page, limit },
    withCredentials: true,
  });
};
export const createProduct = (formData) => 
    api.post("/admin/product/create", formData);

export const updateProductStock = (id, data) =>
    api.patch(`/admin/update/product/stock/${id}`,data)

export const updateProduct = (id, formData) => 
    api.put(`/admin/product/${id}`, formData);

export const deleteProduct = (id) => 
    api.delete(`/admin/product/${id}`);

export const fetchProductById = (id) => 
    api.get(`/admin/products/${id}`);


export const inventoryProducts = (page, limit ) => 
    api.get("/admin/low-products", {
        params: {
            page,
            limit,
        }
    })



export const fetchFilteredProducts = (page = 1, limit = 10, search = "") => {
  return api.get(`/admin/get/filtered/products`, {
    params: { page, limit, search },
    withCredentials: true,
  });
};

