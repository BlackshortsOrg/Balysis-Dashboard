import { API_BASE_URL } from "./constants";

export const squareOffStrategyForUserAPI = async (token, user_id, strat_id, shutdown) => {
  const response = await fetch(`${API_BASE_URL}/trade/squareoff/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token, "admin_pin": "1234" },
    body: JSON.stringify({
      user_id,
      strat_id,
      shutdown
    }),
  });
  return response;
}
