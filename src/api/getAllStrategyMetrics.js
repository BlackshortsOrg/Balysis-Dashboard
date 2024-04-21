import { API_BASE_URL } from "./constants";

export const getAllStrategyMetrics = async (token, start, end) => {
  const response = await fetch(
    `${API_BASE_URL}/metrics/algo?start=${start}&end=${end}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
