/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByTestId,
} from "@testing-library/react";
import SearchResultsPage from "./SearchResultsPage";
import { amenities, readFromReader, search, searchForAHotel } from "../../APIs";
import { BrowserRouter as Router } from "react-router-dom";
import { Hotel, Amenity } from "../../Types";

jest.mock("../../APIs", () => ({
  amenities: jest.fn(),
  readFromReader: jest.fn(),
  search: jest.fn(),
  searchForAHotel: jest.fn(),
}));

jest.mock("../HotelCard/HotelCard", () => ({
  __esModule: true,
  default: ({ hotel }: { hotel: Hotel }) => (
    <li data-testid="hotel-card">{hotel.hotelName}</li>
  ),
}));

jest.mock("../Cart/Cart", () => ({
  __esModule: true,
  default: () => <div data-testid="cart">Cart</div>,
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

const mockAmenities: Amenity[] = [
  { id: 1, name: "WiFi", description: "Free WiFi" },
  { id: 2, name: "Pool", description: "Swimming Pool" },
];

describe("SearchResultsPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of hotels", async () => {
    (search as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockHotels)
    );

    render(
      <Router>
        <SearchResultsPage />
      </Router>
    );

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
    (search as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(mockHotels)), 100)
        )
    );

    render(
      <Router>
        <SearchResultsPage />
      </Router>
    );

    expect(screen.getByAltText("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByAltText("loading")).not.toBeInTheDocument();
    });
  });

  it("renders error state", async () => {
    (search as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <Router>
        <SearchResultsPage />
      </Router>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to fetch search result:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("renders amenities options", async () => {
    const fakeResponse = {
      clone: () => fakeResponse,
      json: jest.fn().mockResolvedValue(mockAmenities),
    };
    (amenities as jest.Mock).mockResolvedValueOnce(fakeResponse);

    (readFromReader as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockAmenities)
    );

    render(
      <Router>
        <SearchResultsPage />
      </Router>
    );
    fireEvent.click(screen.getByTestId("amenities-toggle"), {});

    await waitFor(() => {
      mockAmenities.forEach((amenity) => {
        expect(screen.getByText(amenity.name)).toBeInTheDocument();
      });
    });
  });

  it("applies filters and updates search results", async () => {
    (search as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockHotels.splice(0, 1))
    );

    render(
      <Router>
        <SearchResultsPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Hotel Name"), {
      target: { value: "Hotel One" },
    });
    fireEvent.keyUp(screen.getByPlaceholderText("Hotel Name"), {
      key: "Enter",
      code: "Enter",
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("hotel-card").length).toBe(1);
      expect(screen.getByText("Hotel One")).toBeInTheDocument();
    });
  });

  it("renders header text", () => {
    render(
      <Router>
        <SearchResultsPage />
      </Router>
    );
    expect(
      screen.getByRole("heading", { name: /Search Results/i })
    ).toBeInTheDocument();
  });
});
