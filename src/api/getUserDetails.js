import { API_BASE_URL } from "./constants";

export const getUserDetails = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/user/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return await response.json();
};
