import { API_BASE_URL } from "./constants";

export const getMultiplierUserStrategy = async (token, user_id, strategy_id) => {
  const response = await fetch(
    `${API_BASE_URL}/strategy/multipliers?strategy_id=${strategy_id}&user_id=${user_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
