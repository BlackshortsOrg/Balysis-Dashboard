import { API_BASE_URL } from "./constants";

export const getUserMetricAPI = async (user_id, token, daily) => {
  const response = await fetch(
    `${API_BASE_URL}/metrics/user?daily=${
      daily ? "true" : ""
    }&user_id=${user_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
