import { API_BASE_URL } from "./constants";

export const getUserMetricAPI = async (user_id, token, daily) => {
  const response = await fetch(`${API_BASE_URL}/metrics/user?daily=${daily ? 'true' : ''}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ user_id }),
  });
  return await response.json();
};
