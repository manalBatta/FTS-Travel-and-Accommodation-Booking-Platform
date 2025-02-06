import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CityTableRow from "./CityTableRow";
import { City, Hotel } from "../../../Types";
import { deleteCity } from "../../../services/APIs";

jest.mock("../../../APIs", () => ({
  deleteCity: jest.fn(),
  readFromReader: jest.fn(),
}));

describe("CityTableRow Component", () => {
  const mockHotel: Hotel = {
    hotelId: 101,
    amenities: [],
    location: "Palestine",
    cityName: "Ramallah",
    discount: 15,
    hotelName: "Palestine Grand Hotel",
    latitude: 31.9038,
    longitude: 35.2034,
    roomPhotoUrl: "https://example.com/room-photo.jpg",
    roomPrice: 120.0,
    roomType: "Deluxe Suite",
    starRating: 5,
    description:
      "A luxurious hotel in the heart of Ramallah, offering world-class amenities and services.",
    visitDate: "2025-01-22",
    priceLowerBound: 100.0,
    priceUpperBound: 150.0,
    thumbnailUrl: "https://example.com/hotel-thumbnail.jpg",
    cityId: 1,
    gallery: [],
  };

  const mockCity: City = {
    id: 1,
    name: "Test City",
    description: "A test description",
    hotels: [mockHotel],
    lastUpdate: "Test",
  };
  const mockOnEdit = jest.fn(); //mock function that we can see how many times it was called and with what arguments

  beforeEach(() => {
    window.confirm = jest.fn().mockReturnValue(true); // Mock confirm function
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the city details correctly", () => {
    render(<CityTableRow city={mockCity} onEdit={mockOnEdit} />);

    expect(screen.getByText("Test City")).toBeInTheDocument();
    expect(screen.getByText("A test description")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // Number of hotels
  });

  test("calls onEdit when the row is clicked", () => {
    render(<CityTableRow city={mockCity} onEdit={mockOnEdit} />);

    const row = screen.getByText("Test City").closest(".table-row");
    fireEvent.click(row!);

    expect(mockOnEdit).toHaveBeenCalledWith(mockCity);
  });

  test("handles delete functionality", async () => {
    window.alert = jest.fn();

    render(<CityTableRow city={mockCity} onEdit={mockOnEdit} />);

    const deleteIcon = screen.getByRole("button");

    fireEvent.click(deleteIcon);

    expect(window.confirm).toHaveBeenCalledWith(
      "Assert deleting Test City city"
    );

    await waitFor(() => {
      expect(deleteCity).toHaveBeenCalledWith(1);
    });
  });

  test("does not delete if confirm is canceled", () => {
    window.confirm = jest.fn().mockReturnValue(false);

    render(<CityTableRow city={mockCity} onEdit={mockOnEdit} />);

    const deleteIcon = screen.getByRole("button");
    fireEvent.click(deleteIcon);

    // Assertions
    expect(window.confirm).toHaveBeenCalledWith(
      "Assert deleting Test City city"
    );
    expect(deleteCity).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });
});
