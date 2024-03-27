import { API_BASE_URL } from "./constants";

export const enableUser = async (token, pin, user_id) => {
  const response = await fetch(`${API_BASE_URL}/user/enable`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      admin_pin: pin,
    },
    body: JSON.stringify({
      user_id,
    }),
  });
  return response;
};
