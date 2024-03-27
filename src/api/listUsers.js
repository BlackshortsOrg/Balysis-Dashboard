import { API_BASE_URL } from "./constants";

export const listUsersAPI = async (token) => {
  const response = await fetch(`${API_BASE_URL}/user/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  if (response.status === 401) {
    window.location.href = "/login";
  }
  return await response.json();
};
