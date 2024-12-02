import * as types from "./Types";
const baseURL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api";

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

export const login = async (user: types.User) => {
  return await fetch(baseURL + "/auth/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; utf-8",
    },
    body: JSON.stringify(user),
  });
};

export const search = async (searchDetails: types.SearchDetails) => {
  const searchUrl = `/home/search?sort=${
    searchDetails.sort || "desc"
  }&starRate=${searchDetails.starRate || 5}&checkInDate=${
    searchDetails.checkInDate
  }&checkOutDate=${searchDetails.checkOutDate}&city=${
    searchDetails.city
  }&numberOfRooms=${searchDetails.numberOfRooms}&adults=${
    searchDetails.adults
  }&children=${searchDetails.children}`;
  return await fetch(baseURL + searchUrl);
};

export const searchForAHotel = async (searchHotel: types.SearchHotel) => {
  const searchUrl = `/hotels?name=${searchHotel.name}&searchQuery=${searchHotel.description}&pageSize=${searchHotel.pageSize}&pageNumber=${searchHotel.pageNumber}`;
  return await fetch(baseURL + searchUrl);
};

//Request the  Amenities of all hotels
export const amenities = async () => {
  return await fetch(baseURL + "/search-results/amenities");
};

export const featuredDeals = async () => {
  return await fetch(baseURL + "/home/featured-deals");
};

export const recentHotels = async (userId: number) => {
  const authLocalStorage = localStorage.getItem("auth");
  const result = authLocalStorage ? JSON.parse(authLocalStorage) : null;
  const token = result?.authentication;

  if (!token) {
    throw new Error("Authorization token is missing");
  }

  // console.log(
  //   "from request of recent hotels api",
  //   `/home/users/${userId}/recent-hotels`
  // );

  return await fetch(baseURL + `/home/users/${userId}/recent-hotels`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const trendingDestinations = async () => {
  return await fetch(baseURL + "/home/destinations/trending");
};

export const hotel = async (hotelId: number) => {
  return await fetch(baseURL + `/hotels/${hotelId}`);
};

export const hotelGallery = async (hotelId: number) => {
  return await fetch(baseURL + `/hotels/${hotelId}/gallery`);
};

export const hotelRooms = async (hotelId: number) => {
  return await fetch(
    baseURL +
      `/hotels/${hotelId}/rooms?checkInDate=1-2-2023&checkOutDate=1-3-2023`
  );
};

export const hotelAvailableRooms = async (hotelId: number) => {
  return await fetch(
    baseURL +
      `/hotels/${hotelId}/available-rooms?checkInDate=1-2-2023&checkOutDate=1-3-2023`
  );
};
