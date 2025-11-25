import apiInstance from "./index";

export const getSettings = async () => {
  return apiInstance.get("/settings");
};

export const createSettings = async (data) => {
  return apiInstance.post("/settings", data);
};

export const updateSettings = async (data) => {
  return apiInstance.put("/settings", data); 
};
