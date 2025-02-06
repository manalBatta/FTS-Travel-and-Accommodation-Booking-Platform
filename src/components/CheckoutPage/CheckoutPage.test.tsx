/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutPage from "./CheckoutPage";
import { CartContext } from "../context/cart";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { bookRoom, readFromReader, roomDetails } from "../../services/APIs";
import { getUser } from "../../Helpers";
import "@testing-library/jest-dom/extend-expect";
import { RoomType, CartItem } from "../../Types";

jest.mock("../../APIs");
jest.mock("../../Helpers");

const mockCartItems: CartItem[] = [
  { id: 1, hotelName: "Hotel A" },
  { id: 2, hotelName: "Hotel B" },
];

const mockRoomsDetails: RoomType[] = [
  {
    roomId: 1,
    roomNumber: 101,
    roomPhotoUrl: "url1",
    roomType: "Deluxe",
    capacityOfAdults: 2,
    capacityOfChildren: 2,
    roomAmenities: [],
    price: 200,
    availability: true,
  },
  {
    roomId: 2,
    roomNumber: 102,
    roomPhotoUrl: "url2",
    roomType: "Standard",
    capacityOfAdults: 2,
    capacityOfChildren: 2,
    roomAmenities: [],
    price: 150,
    availability: true,
  },
];

const mockUser = { given_name: "John Doe" };

const setup = () => {
  render(
    <Router>
      <CartContext.Provider
        value={{
          cartItems: mockCartItems,
          addToCart: jest.fn(),
          removeFromCart: jest.fn(),
          clearCart: jest.fn(),
        }}
      >
        <CheckoutPage />
      </CartContext.Provider>
    </Router>
  );
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CheckoutPage Component", () => {
  beforeEach(() => {
    (roomDetails as jest.Mock).mockImplementation((id) =>
      Promise.resolve({ body: JSON.stringify(mockRoomsDetails[id - 1]) })
    );
    (readFromReader as jest.Mock).mockImplementation((response) =>
      Promise.resolve(response.body)
    );
    (getUser as jest.Mock).mockReturnValue(mockUser);
  });

  it("renders booking summary and payment form", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText("Booking Summery")).toBeInTheDocument();
      expect(screen.getByText("Total Payment:$350")).toBeInTheDocument();
      expect(screen.getByText("Payment Details")).toBeInTheDocument();
    });
  });

  it("fetches and displays room details", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText("Hotel A")).toBeInTheDocument();
      expect(screen.getByText("Hotel B")).toBeInTheDocument();
      expect(screen.getByText("Deluxe room")).toBeInTheDocument();
      expect(screen.getByText("Standard room")).toBeInTheDocument();
    });
  });

  it("executes payment and navigates to confirmation page", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    setup();

    await waitFor(() => {
      expect(screen.getByText("Total Payment:$350")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Confirm Payment"));

    await waitFor(() => {
      expect(bookRoom).toHaveBeenCalledTimes(2);
      expect(mockNavigate).toHaveBeenCalledWith("/confirmation", {
        state: expect.any(Array),
      });
    });
  });
});
