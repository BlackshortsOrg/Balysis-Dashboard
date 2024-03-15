import { API_BASE_URL } from "./constants";

export const updatePresetsAPI = async (token, name, user_ids, multipliers) => {
  if (user_ids.length == 0) {
    return;
  }
  const response = await fetch(`${API_BASE_URL}/presets/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({
      user_ids,
      name,
      multipliers,
    }),
  });
  return response;
};
