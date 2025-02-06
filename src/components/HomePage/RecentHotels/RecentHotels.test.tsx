import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import RecentHotels from "./RecentHotels";
import { recentHotels, readFromReader } from "../../../services/APIs";
import { getUser } from "../../../Helpers";
import { Hotel } from "../../../Types";

jest.mock("../../../APIs", () => ({
  recentHotels: jest.fn(),
  readFromReader: jest.fn(),
}));

jest.mock("../../../Helpers", () => ({
  getUser: jest.fn(),
}));

jest.mock("../../HotelCard/HotelCard", () => ({
  __esModule: true,
  default: ({ hotel }: { hotel: Hotel }) => (
    <li data-testid="hotel-card">{hotel.hotelName}</li>
  ),
}));

const mockHotels: Hotel[] = [
  {
    hotelId: 1,
    amenities: [],
    location: "Location A",
    cityName: "City A",
    discount: 0.1,
    hotelName: "Hotel One",
    latitude: 0.0,
    longitude: 0.0,
    roomPhotoUrl: "url1",
    roomPrice: 100,
    roomType: "Deluxe",
    starRating: 4,
    description: "Description One",
    visitDate: "2023-10-01",
    priceLowerBound: 90,
    priceUpperBound: 110,
    thumbnailUrl: "thumb1",
    cityId: 1,
    gallery: [],
  },
  {
    hotelId: 2,
    amenities: [],
    location: "Location B",
    cityName: "City B",
    discount: 0.2,
    hotelName: "Hotel Two",
    latitude: 0.0,
    longitude: 0.0,
    roomPhotoUrl: "url2",
    roomPrice: 200,
    roomType: "Standard",
    starRating: 5,
    description: "Description Two",
    visitDate: "2023-10-02",
    priceLowerBound: 180,
    priceUpperBound: 220,
    thumbnailUrl: "thumb2",
    cityId: 2,
    gallery: [],
  },
];

describe("RecentHotels Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of recent hotels", async () => {
    (getUser as jest.Mock).mockReturnValue({ user_id: 1 });
    (recentHotels as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockHotels)
    );

    render(<RecentHotels />);

    await waitFor(() => {
      expect(screen.getAllByTestId("hotel-card").length).toBe(
        mockHotels.length
      );
    });

    mockHotels.forEach((hotel) => {
      expect(screen.getByText(hotel.hotelName)).toBeInTheDocument();
    });
  });

  it("renders loading state", async () => {
    (getUser as jest.Mock).mockReturnValue({ user_id: 1 });
    (recentHotels as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(mockHotels)), 100)
        )
    );

    render(<RecentHotels />);

    expect(screen.getByAltText("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByAltText("loading")).not.toBeInTheDocument();
    });
  });

  it("renders error state", async () => {
    (getUser as jest.Mock).mockReturnValue({ user_id: 1 });
    (recentHotels as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<RecentHotels />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to load recent hotels:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("renders header text", () => {
    render(<RecentHotels />);
    expect(
      screen.getByRole("heading", { name: /You Recently been in/i })
    ).toBeInTheDocument();
  });
});
