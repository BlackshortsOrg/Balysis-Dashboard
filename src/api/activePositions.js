import { API_BASE_URL } from "./constants";

export const activeClientPositionsAPI = async (token) => {
  const response = await fetch(
    `${API_BASE_URL}/metrics/active-client-positions`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
