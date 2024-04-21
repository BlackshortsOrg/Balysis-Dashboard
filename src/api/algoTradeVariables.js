import { API_BASE_URL } from "./constants";

/**
 * Fetches algorithmic trading variables from the server for a specific strategy.
 * @param {string} token - Authorization token.
 * @param {string} strategy_id - ID of the strategy.
 * @param {string} strategy_name - Name of the strategy.
 * @returns {Promise<Object>} - A promise that resolves to the response JSON containing algorithmic trading variables.
 */
export const getAlgoTradeVariable = async (token, strategy_id, strategy_name) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/strategy/env?instance_id=${strategy_id}&strategy_name=${strategy_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching algorithmic trading variables:", error.message);
    throw error;
  }
};

/**
 * Updates algorithmic trading variables for a specific strategy on the server.
 * @param {string} token - Authorization token.
 * @param {string} strategy_id - ID of the strategy.
 * @param {string} strategy_name - Name of the strategy.
 * @param {Object} updatedValue - Object containing updated variables.
 * @returns {Promise<Response>} - A promise that resolves to the fetch response.
 */
export const postAlgoTradeVariable = async (token, instance_id, strategy_id, strategy_name, updatedValue) => {
  try {
    const response = await fetch(`${API_BASE_URL}/strategy/change-env`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        instance_id,
        strategy_id,
        strategy_name,
        ...updatedValue,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error updating algorithmic trading variables:", error.message);
    throw error;
  }
};


