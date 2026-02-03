// api/dashboardApi.js
import api from "./axios";

export const fetchWeeklyStats = () =>
  api.get("/admin/dashboard/weekly-stats");

export const fetchOrdersLast7Days = () =>
  api.get("/admin/dashboard/orders-last-7-days");

