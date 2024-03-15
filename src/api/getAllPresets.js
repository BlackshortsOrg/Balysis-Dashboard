import { API_BASE_URL } from "./constants";

export const getAllPresets = async (token) => {
  const response = await fetch(`${API_BASE_URL}/presets/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return await response.json();
};
