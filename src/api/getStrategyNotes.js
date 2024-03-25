import { API_BASE_URL } from "./constants";

export const getStrategyNotes = async (token, strategy_id) => {
  const response = await fetch(
    `${API_BASE_URL}/strategy/notes?strategy_id=${strategy_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
