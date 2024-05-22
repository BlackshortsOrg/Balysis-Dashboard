import { API_BASE_URL } from "./constants";

export const updateStrategyNote = async (token, strategy_name, note) => {
  const response = await fetch(`${API_BASE_URL}/strategy/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ strategy_name, note }),
  });
  return await response.json();
};
