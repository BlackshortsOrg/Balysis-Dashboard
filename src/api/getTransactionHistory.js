import { API_BASE_URL } from "./constants";

export const getTransactionHistoryAPI = async (token, daily = false) => {
  const response = await fetch(
    `${API_BASE_URL}/metrics/transaction-history?daily=${daily ? "true" : ""}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    },
  );
  return await response.json();
};
