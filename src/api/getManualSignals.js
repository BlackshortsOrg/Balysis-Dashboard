import { API_BASE_URL } from "./constants";

export const getManualSignals = async () => {
  const response = await fetch(`${API_BASE_URL}/strategy/1/signals`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};
