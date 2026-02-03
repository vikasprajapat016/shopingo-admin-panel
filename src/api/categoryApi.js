import api from "./axios.js";

export const fetchCategories = () =>
  api.get("/admin/category");

export const fetchCategoryById = (id) => 
  api.get(`/admin/category/${id}`);


export const createCategory = (data) =>
  api.post("/admin/create/category", data);

export const updateCategory = (id, data) =>
  api.put(`/admin/update/${id}`,data);

export const deleteCategory = (id) =>
  api.delete(`/admin/delete/${id}`);
