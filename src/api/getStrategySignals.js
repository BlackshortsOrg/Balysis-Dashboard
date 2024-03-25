import { API_BASE_URL } from "./constants";

export const getStrategySignals = async (strategy_id, token, daily) => {
  const response = await fetch(
    `${API_BASE_URL}/strategy/signals?strategy_id=${strategy_id}&daily=${
      daily ? "true" : ""
    }`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
