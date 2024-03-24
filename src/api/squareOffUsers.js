import { API_BASE_URL } from "./constants";

export const squareOffUser = async (token, pin, user_id, shutdown) => {
  const response = await fetch(`${API_BASE_URL}/trade/squareoff/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token, "admin_pin": pin },
    body: JSON.stringify({
      user_id,
      shutdown
    }),
  });
  return response;
}
