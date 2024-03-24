import { API_BASE_URL } from "./constants";

export const squareOffAll = async (token, pin, shutdown) => {
  const response = await fetch(`${API_BASE_URL}/trade/squareoff/all`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token, "admin_pin": pin },
    body: JSON.stringify({
      shutdown
    }),
  });
  return response;
}
