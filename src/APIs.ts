const basseURL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net";

export interface User {
  username: string;
  password: string;
}

export const loginLoader = async (user: User) => {
  return await fetch(basseURL + "/api/auth/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; utf-8",
    },
    body: JSON.stringify(user),
  });
};
