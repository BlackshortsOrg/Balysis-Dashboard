import { API_BASE_URL } from "./constants";

export const getUserMetricAPI = async (user_id, token, start, end) => {
  const response = await fetch(
    `${API_BASE_URL}/metrics/user?start=${start}&end=${end}&user_id=${user_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
