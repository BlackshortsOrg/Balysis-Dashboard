import { API_BASE_URL } from "./constants";

export const activeClientPositionsAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/metrics/active-client-positions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};
