import { API_BASE_URL } from "./constants";

export const cancelTradeAPI = async (order_id) => {
  const response = await fetch(`${API_BASE_URL}/trade/manual`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signal_type: "CANCEL_ORDER", ref_id: order_id }),
  });
  return await response.json();
};
