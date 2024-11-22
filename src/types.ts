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
