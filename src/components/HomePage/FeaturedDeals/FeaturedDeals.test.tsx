import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FeaturedDeals from "./FeaturedDeals";
import { featuredDeals, readFromReader } from "../../../APIs";
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
  { hotelId: 4, hotelName: "Hotel Four", discount: 0.4, cityName: "City D" },
];

describe("FeaturedDeals Component", () => {
  it("renders the correct number of deals", async () => {
    (featuredDeals as jest.Mock).mockResolvedValueOnce({});
    (readFromReader as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockDeals)
    );

    render(<FeaturedDeals />);

    await waitFor(() => {
      expect(screen.getAllByTestId("featured-deal").length).toBe(3);
    });

    mockDeals.slice(0, 3).forEach((deal) => {
      expect(screen.getByText(deal.hotelName)).toBeInTheDocument();
    });
  });

  it("renders header text", () => {
    render(<FeaturedDeals />);
    expect(
      screen.getByRole("heading", { name: /Featured Deals/i })
    ).toBeInTheDocument();
  });
});
