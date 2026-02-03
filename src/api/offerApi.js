// api/offerApi.js
import axios from "axios";
import api from "./axios";

const baseUrl = import.meta.env.VITE_API_URL

export const fetchActiveOffers = () =>
  axios.get(`${baseUrl}/admin/offers`);


export const toggleActive = (id) => 
  api.patch(`${baseUrl}/admin/offers/toggle/${id}`)


export const getOfferById = (id) => 
  api.get(`${baseUrl}/admin/get/offer/${id}`)


export const deleteOffer = (id) => 
  api.delete(`${baseUrl}/admin/offers/delete/${id}`)