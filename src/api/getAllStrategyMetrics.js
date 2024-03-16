import { API_BASE_URL } from "./constants";

export const getAllStrategyMetrics = async (token, daily) => {
  const response = await fetch(
    `${API_BASE_URL}/metrics/algo?daily=${daily ? 'true' : ''}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
