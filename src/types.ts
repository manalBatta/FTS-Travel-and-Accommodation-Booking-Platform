import { JwtPayload } from "jwt-decode";

export type FeaturedDealType = {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
};

const todayStr = new Date().toISOString().split("T")[0];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split("T")[0];

export type Amenity = {
  id: number;
  name: string;
  description: string;
};

export type Hotel = {
  hotelId: number;
  amenities: Amenity[];
  cityName: string;
  discount: number;
  hotelName: string;
  latitude: number;
  longitude: number;
  roomPhotoUrl: string;
  roomPrice: number;
  roomType: string;
  starRating: number;
  description: string;
  visitDate: string;
  priceLowerBound: number;
  priceUpperBound: number;
  thumbnailUrl: string;
};

export interface User {
  username: string;
  password: string;
}

export interface Auth extends JwtPayload {
  exp: number;
  family_name: string;
  given_name: string;
  iss: string;
  nbf: number;
  userType: string;
  user_id: string;
}
export interface SearchDetails {
  checkInDate: string;
  checkOutDate: string;
  city: string;
  numberOfRooms: number;
  adults: number;
  children: number;
  sort: string;
  starRate: number;
}

export const SearchDetailsInitialValue: SearchDetails = {
  checkInDate: todayStr,
  checkOutDate: tomorrowStr,
  city: "",
  numberOfRooms: 1,
  adults: 2,
  children: 1,
  sort: "desc",
  starRate: 1,
};
export interface SearchHotel {
  name: string;
  description: string;
  pageSize: number;
  pageNumber: number;
}

export interface Destination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}
