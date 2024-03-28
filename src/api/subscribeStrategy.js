import { API_BASE_URL } from "./constants";

export const subscribeStrategyAPI = async (
  token,
  users,
  strategy_id,
  multipliers,
  strategy_name,
  pin,
) => {
  const response = await fetch(`${API_BASE_URL}/strategy/subscribe`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      admin_pin: pin,
    },
    body: JSON.stringify({
      users,
      strategy_id,
      multipliers,
      name: strategy_name,
    }),
  });
  return response;
};
