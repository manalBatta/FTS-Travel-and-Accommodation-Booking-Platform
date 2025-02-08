import * as types from "../Types";
import { CitiesRequest, City } from "../Types";
const baseURL = "https://hotel.foothilltech.net/api";



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

export const hotelRooms = async (
  hotelId: number,
  checkInDate: string,
  checkOutDate: string
) => {
  return await fetch(
    baseURL +
      `/hotels/${hotelId}/rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
  );
};

export const hotelAvailableRooms = async (hotelId: number) => {
  return await fetch(
    baseURL +
      `/hotels/${hotelId}/available-rooms?checkInDate=1-2-2023&checkOutDate=1-3-2023`
  );
};

export const hotelReviews = async (hotelId: number) => {
  return await fetch(baseURL + `/hotels/${hotelId}/reviews`);
};

export const roomDetails = async (roomId: number) => {
  return await fetch(baseURL + `/rooms/${roomId}`);
};

export const bookRoom = async (body: types.BookingDetails) => {
  const authLocalStorage = localStorage.getItem("auth");
  const result = authLocalStorage ? JSON.parse(authLocalStorage) : null;
  const token = result?.authentication;
  return await fetch(baseURL + "/bookings/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; utf-8",
      Authorization: `Bearer ${token}`, // The token is unvalid due to
    },
    body: JSON.stringify(body),
  });
};

export const getCities = async (city: CitiesRequest) => {
  return await fetch(
    baseURL +
      `/cities?name=${city.name || ""}&searchQuery=${
        city.searchQuery || ""
      }&pageSize=${city.pageSize || 10}&pageNumber=${city.pageNumber || 1}`
  );
};

export const getCity = async (cityId: number) => {
  const authLocalStorage = localStorage.getItem("auth");
  const result = authLocalStorage ? JSON.parse(authLocalStorage) : null;
  const token = result?.authentication;
  // console.log("before getting city ensure its id =", cityId);
  return await fetch(baseURL + `/cities/${cityId}?includeHotels=true`, {
    headers: {
      "Content-Type": "application/json; utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCity = async (cityId: number | undefined) => {
  if (cityId === undefined) return;
  const authLocalStorage = localStorage.getItem("auth");
  const result = authLocalStorage ? JSON.parse(authLocalStorage) : null;
  const token = result?.authentication;
  return await fetch(baseURL + `/cities/${cityId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCity = async (city: City) => {
  const authLocalStorage = localStorage.getItem("auth");
  const result = authLocalStorage ? JSON.parse(authLocalStorage) : null;
  const token = result?.authentication;
  console.log("before getting city ensure its name =", city.name);
  return await fetch(baseURL + `/cities/${city.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: city.name, description: city.description }),
  });
};
