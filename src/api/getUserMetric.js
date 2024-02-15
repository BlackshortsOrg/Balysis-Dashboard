import { API_BASE_URL } from "./constants";

export const getUserMetricAPI = async (user_id) => {
  const response = await fetch(`${API_BASE_URL}/metrics/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id }),
  });
  return await response.json();
};
