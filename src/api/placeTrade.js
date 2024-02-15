import { API_BASE_URL } from "./constants";

export const placeTradeAPI = async (trade) => {
  const response = await fetch(`${API_BASE_URL}/trade/manual`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trade),
  });
  return await response.json();
};
