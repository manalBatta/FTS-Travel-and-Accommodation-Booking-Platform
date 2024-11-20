const baseURL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net";

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

export async function readFromReader(reader: any) {
  if (!reader) {
    console.error("Reader is not available.");
    return;
  }

  try {
    let result = await reader.read();
    while (!result.done) {
      const chunk = result.value;
      console.log("Chunk received:", new TextDecoder().decode(chunk));
      result = await reader.read();
    }
    console.log("Stream reading complete.");
  } catch (error) {
    console.error("Error while reading from reader:", error);
  }
}

export const login = async (user: User) => {
  return await fetch(baseURL + "/api/auth/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; utf-8",
    },
    body: JSON.stringify(user),
  });
};

export const search = async (searchDetails: SearchDetails) => {
  return await fetch(
    baseURL + "/api/home/search?starRate=4&numberOfRooms=1&adults=2&children=0"
  );
};
