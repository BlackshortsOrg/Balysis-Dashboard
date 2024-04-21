import { API_BASE_URL } from "./constants";

export const getStrategySignals = async (strategy_name, token, start, end) => {
  const response = await fetch(
    `${API_BASE_URL}/strategy/signals?strategy_name=${strategy_name}&start=${start}&end=${end}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
