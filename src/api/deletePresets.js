import { API_BASE_URL } from "./constants";

export const deletePresetsAPI = async (token, name, user_ids) => {
  if (user_ids === null) {
    const response = await fetch(`${API_BASE_URL}/presets/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        name,
      }),
    });
    return response;
  }
  if (user_ids.length == 0) {
    return;
  }
  const response = await fetch(`${API_BASE_URL}/presets/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({
      user_ids,
      name,
    }),
  });
  return response;
};
