import apiInstance from "./index";

export const getRooms = async (userData) => {
  const response = await apiInstance.get("/rooms", userData);
  return response;
};

export const createRoom = async (userData) => {
  const response = await apiInstance.post("/rooms", userData);
  return response;
};

export const updateRoom = async (id, userData) => {
  const response = await apiInstance.put(`/rooms?id=${id}`, userData);
  return response;
};

export const deleteRoom = async (id) => {
  const response = await apiInstance.delete(`/rooms?id=${id}`);
  return response;
};