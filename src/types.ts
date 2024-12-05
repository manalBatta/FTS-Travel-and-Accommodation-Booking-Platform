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

export interface Photo {
  url: string;
  id: string;
}
export interface Hotel {
  hotelId: number;
  amenities: Amenity[];
  location: string;
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
  cityId: number;
  gallery: Photo[];
}

export interface RoomType {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: Amenity[];
  price: number;
  availability: boolean;
}

export interface Review {
  reviewId: number;
  customerName: string;
  rating: number;
  description: string;
}
export const initialHotel: Hotel = {
  hotelId: 0,
  amenities: [],
  location: "Palestine",
  cityName: "",
  discount: 0,
  hotelName: "",
  latitude: 0.0,
  longitude: 0.0,
  roomPhotoUrl: "",
  roomPrice: 0.0,
  roomType: "",
  starRating: 0,
  description: "",
  visitDate: "",
  priceLowerBound: 0.0,
  priceUpperBound: 0.0,
  thumbnailUrl: "",
  cityId: 1,
  gallery: [],
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

export interface mapArguments {
  latitude: number;
  longitude: number;
  hotelName: string;
  description: string;
}

export interface CartItem {
  id: number;
  price: number;
}

export interface CartContextValue {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  cartItems: CartItem[];
}

export type RoomProps = {
  room: RoomType;
  addToCart: (item: CartItem) => void;
};

export type buttonProps = {
  handleClick?: React.MouseEventHandler;
  disabled?: boolean;
};
