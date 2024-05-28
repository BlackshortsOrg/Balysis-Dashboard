import { API_BASE_URL } from "./constants";

export const getStrategyOrderbookAPI = async (
  token,
  strategy_id,
  start,
  end,
) => {
  const response = await fetch(
    `${API_BASE_URL}/metrics/orderbook?start=${start}&end=${end}&strategy_id=${strategy_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
