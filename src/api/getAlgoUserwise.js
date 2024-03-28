import { API_BASE_URL } from "./constants";

export const getAlgoMetricsUserwise = async (token, strategy_id, daily) => {
  const response = await fetch(
    `${API_BASE_URL}/metrics/strategy/userwise?strategy_id=${strategy_id}&daily=${
      daily ? "true" : ""
    }`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
