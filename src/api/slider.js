import api from "./axios";

export const fetchSliders = () =>
  api.get("/admin/sliders");

export const createSlider = (data) =>
  api.post("/admin/create/slider", data);

export const getSliderById = (id) =>
  api.get(`/admin/sliders/${id}`);

export const updateSlider = (id, data) =>
  api.put(`/admin/slider/update/${id}`, data);

export const deleteSlider = (id) =>
  api.delete(`/admin/slider/delete/${id}`);

export const getActiveSliders = () =>
  api.get("/admin/active/sliders");
