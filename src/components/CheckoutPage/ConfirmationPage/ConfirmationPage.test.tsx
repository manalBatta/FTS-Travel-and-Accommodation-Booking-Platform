import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import ConfirmationPage from "./ConfirmationPage";
import { Reservation } from "../../../Types";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("ConfirmationPage", () => {
  const mockReservations: Reservation[] = [
    {
      customerName: "John Doe",
      hotelName: "Luxury Inn",
      roomNumber: "101",
      roomType: "Deluxe",
      bookingDateTime: "2025-01-15T12:30:00Z",
      totalCost: 200.5,
      paymentMethod: "Credit Card",
      bookingStatus: "Confirmed",
      confirmationNumber: "ABC12345",
    },
    {
      customerName: "Jane Smith",
      hotelName: "Comfort Suites",
      roomNumber: "202",
      roomType: "Suite",
      bookingDateTime: "2025-01-16T14:00:00Z",
      totalCost: 350.75,
      paymentMethod: "PayPal",
      bookingStatus: "Confirmed",
      confirmationNumber: "DEF67890",
    },
  ];

  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ state: mockReservations });
    (
      jest.requireMock("react-router-dom").useNavigate as jest.Mock
    ).mockReturnValue(mockNavigate);
  });

  it("renders the confirmation page with reservations", () => {
    render(
      <MemoryRouter>
        <ConfirmationPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Your Reservations")).toBeInTheDocument();

    mockReservations.forEach((reservation, index) => {
      expect(screen.getByText(`Reservation ${index + 1}`)).toBeInTheDocument();
      expect(screen.getByText(reservation.customerName)).toBeInTheDocument();
      expect(screen.getByText(reservation.hotelName)).toBeInTheDocument();
      expect(screen.getByText(reservation.roomType)).toBeInTheDocument();
      expect(
        screen.getByText(new Date(reservation.bookingDateTime).toLocaleString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(`$${reservation.totalCost.toFixed(2)}`)
      ).toBeInTheDocument();
      expect(screen.getByText(reservation.paymentMethod)).toBeInTheDocument();
      expect(
        screen.getByText(reservation.confirmationNumber)
      ).toBeInTheDocument();
    });
  });

  it("calls window.print when the Print Report button is clicked", () => {
    const printSpy = jest.spyOn(window, "print").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <ConfirmationPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Print Report"));

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it("navigates to the home page when the Home button is clicked", () => {
    render(
      <MemoryRouter>
        <ConfirmationPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Home"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
