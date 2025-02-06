import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FeaturedDeals from "./FeaturedDeals";
import { featuredDeals, readFromReader } from "../../../services/APIs";
import { FeaturedDealType } from "../../../Types";

jest.mock("../../../APIs", () => ({
  featuredDeals: jest.fn(),
  readFromReader: jest.fn(),
}));

jest.mock("./FeaturedDeal/FeaturedDeal", () => ({
  __esModule: true,
  default: ({ deal }: { deal: FeaturedDealType }) => (
    <li data-testid="featured-deal">{deal.hotelName}</li>
  ),
}));

const mockDeals = [
  { hotelId: 1, hotelName: "Hotel One", discount: 0.2, cityName: "City A" },
  { hotelId: 2, hotelName: "Hotel Two", discount: 0.3, cityName: "City B" },
  { hotelId: 3, hotelName: "Hotel Three", discount: 0.1, cityName: "City C" },
];

describe("FeaturedDeals Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of deals", async () => {
    (featuredDeals as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockDeals)
    );

    render(<FeaturedDeals />);

    await waitFor(() => {
      expect(screen.getAllByTestId("featured-deal").length).toBe(
        mockDeals.length
      );
    });

    mockDeals.forEach((deal) => {
      expect(screen.getByText(deal.hotelName)).toBeInTheDocument();
    });
  });

  it("renders loading state", async () => {
    (featuredDeals as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(JSON.stringify(mockDeals)), 100)
        )
    );

    render(<FeaturedDeals />);

    expect(screen.getByAltText("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByAltText("loading")).not.toBeInTheDocument();
    });
  });

  it("renders error state", async () => {
    (featuredDeals as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<FeaturedDeals />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining("Failed to fetch featured deals")
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("renders header text", () => {
    render(<FeaturedDeals />);
    expect(
      screen.getByRole("heading", { name: /Featured Deals/i })
    ).toBeInTheDocument();
  });
});
