const baseURL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api";

export interface User {
  username: string;
  password: string;
}

export interface SearchDetails {
  checkInDate: string;
  checkOutDate: string;
  city: string;
  numberOfRooms: number;
  adults: number;
  children: number;
}

export async function readFromReader(res: Response | undefined | null) {
  const reader = res?.body?.getReader();
  if (!reader) {
    console.error("Reader is not available.");
    return;
  }

  try {
    const decoder = new TextDecoder();
    let result = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }

    return result;
  } catch (error) {
    console.error("Error while reading from reader:", error);
  }
}

export const login = async (user: User) => {
  return await fetch(baseURL + "/auth/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; utf-8",
    },
    body: JSON.stringify(user),
  });
};

export const search = async (searchDetails: SearchDetails) => {
  const searchUrl = `/home/search?checkInDate=${searchDetails.checkInDate}&checkOutDate=${searchDetails.checkOutDate}&city=${searchDetails.city}&numberOfRooms=${searchDetails.numberOfRooms}&adults=${searchDetails.adults}&children=${searchDetails.children}`;
  return await fetch(baseURL + searchUrl);
};

export const amenities = async () => {
  return await fetch(baseURL + "/search-results/amenities");
};
