import { API_BASE_URL } from "./constants";

export const getAllUsers = async (token) => {
  const response = await fetch(`${API_BASE_URL}/user/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return await response.json();
};
