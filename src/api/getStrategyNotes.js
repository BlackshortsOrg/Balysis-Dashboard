import { API_BASE_URL } from "./constants";

export const getStrategyNotes = async (token, strategy_name) => {
  const response = await fetch(
    `${API_BASE_URL}/strategy/notes?strategy_name=${strategy_name}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
