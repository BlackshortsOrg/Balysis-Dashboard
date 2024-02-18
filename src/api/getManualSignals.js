import { API_BASE_URL } from "./constants";

export const getManualSignals = async (token) => {
  const response = await fetch(
    `${API_BASE_URL}/strategy/signals?strategy_id=${1}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
