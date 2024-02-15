import { API_BASE_URL } from "./constants";

export const listUsersAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/user/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};
