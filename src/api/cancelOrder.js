import { API_BASE_URL } from "./constants";

export const cancelTradeAPI = async (org_signal, token) => {
  const response = await fetch(`${API_BASE_URL}/trade/manual`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({
      signal_type: "CANCEL_ORDER",
      ref_id: org_signal.signal_id,
      exchange: org_signal.exchange,
      symbol: org_signal.symbol,
      product_type: org_signal.product_type,
      order_type: org_signal.order_type,
      limit_price: org_signal.limit_price,
      stop_price: org_signal.stop_price,
      segment: org_signal.segment,
      quantity: org_signal.qty,
      side: org_signal.side,
      users: [-1],
    }),
  });
  return await response.json();
};
