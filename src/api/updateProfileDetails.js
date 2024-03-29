import { API_BASE_URL } from "./constants";

export const updateProfile = async (token, user_id, user) => {
  const response = await fetch(`${API_BASE_URL}/user/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({
      user_id,
      user,
    }),
  });
  return response;
};
