import { API_BASE_URL } from "./constants";

export const getAllAlgoMetrics = async (token) => {
  const response = await fetch(`${API_BASE_URL}/metrics/algo`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return await response.json();
};
