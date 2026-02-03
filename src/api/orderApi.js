import api from "./axios";
export const fetchOrders = () =>
  api.get("/admin/orders");

export const fetchOrderById = (id) =>
  api.get(`/admin/orders/${id}`);

export const updateOrderStatus = (id, status) =>
  api.put(`/admin/orders/${id}/status`, { status });
