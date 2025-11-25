// src/services/api/tenants.js
import apiInstance from "./index";

export const getDataTenants = async () => {
  const response = await apiInstance.get("/tenants");
  return response;
};

export const getDataRooms = async () => {
  const response = await apiInstance.get("/rooms");
  return response;
};

export const createTenant = async (userData) => {
  const response = await apiInstance.post("/tenants", userData);
  return response;
};

export const updateTenant = async (tenantId, userData) => {
  const response = await apiInstance.put(`/tenants?id=${tenantId}`, userData);
  return response;
};

export const deleteTenant = async (tenantId) => {
  const response = await apiInstance.delete(`/tenants?id=${tenantId}`);
  return response;
};