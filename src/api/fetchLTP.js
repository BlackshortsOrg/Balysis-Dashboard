import { API_BASE_URL } from "./constants";

export const fetchLTPApi = async (token, symbol, segment, exchange) => {
  const response = await fetch(`${API_BASE_URL}/tickers/ltp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      symbol,
      segment,
      exchange
    }),
  });
  if (response.status !== 200) {
    window.location.href = "/login"
    return response
  }
  return await response.json();
};
