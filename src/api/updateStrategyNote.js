import { API_BASE_URL } from "./constants";

export const updateStrategyNote = async (token, strategy_id, note) => {
  const response = await fetch(`${API_BASE_URL}/strategy/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ strategy_id, note }),
  });
  return await response.json();
};
