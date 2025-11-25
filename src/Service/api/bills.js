
// src/services/api/endpoints.js
import apiInstance from "./index";

// POST: Tương tự
export const getDataBills = async (userData) => {
  const response = await apiInstance.get("/bills", userData);
  return response;
};

export const createBills = async (userData) => {
  const response = await apiInstance.post("/bills", userData);
  return response;
};

export const deleteBills = async (id) => {
  const response = await apiInstance.delete(`/bills?id=${id}`);
  return response;
};

export const getTenants = async (userData) => {
  const response = await apiInstance.get("/tenants", userData);
  return response;
};

export const getRooms = async (userData) => {
  const response = await apiInstance.get("/rooms", userData);
  return response;
};

export const updateBills = async (id, userData) => {
  const response = await apiInstance.put(`/bills?id=${id}`, userData);
  return response;
};