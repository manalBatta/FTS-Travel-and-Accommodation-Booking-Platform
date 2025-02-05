import React from "react";
import { render, screen } from "@testing-library/react";
import FeaturedDeal from "./FeaturedDeal";
import { FeaturedDealType } from "../../../../Types";
import { motion } from "framer-motion";

jest.mock("framer-motion", () => ({
  motion: {
    li: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <li {...props}>{children}</li>,
  },
}));

const mockDeal: FeaturedDealType = {
  hotelId: 1,
  originalRoomPrice: 250,
  discount: 0.2,
  finalPrice: 200,
  cityName: "City A",
  hotelName: "Hotel One",
  hotelStarRating: 4,
  title: "Deluxe Room",
  description: "A luxurious room with all amenities.",
  roomPhotoUrl: "url1",
};

beforeAll(() => {
    global.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
      observe() {}
      unobserve() {}
      disconnect() {}
      root: null = null;
      rootMargin: "" = "";
      thresholds: number[] = [];
      takeRecords() {
        return [];
      }
    };
  });
describe("FeaturedDeal Component", () => {
  it("renders the deal with correct data", () => {
    render(<FeaturedDeal deal={mockDeal} />);

    expect(screen.getByText("Hotel One")).toBeInTheDocument();
    expect(screen.getByText("A luxurious room with all amenities.")).toBeInTheDocument();
    expect(screen.getByText("City A")).toBeInTheDocument();
    expect(screen.getByAltText("deal gallery")).toHaveAttribute("src", "url1");
  });

  it("renders default image if roomPhotoUrl is not provided", () => {
    const dealWithoutPhoto = { ...mockDeal, roomPhotoUrl: "" };
    render(<FeaturedDeal deal={dealWithoutPhoto} />);

    expect(screen.getByAltText("deal gallery")).toHaveAttribute("src", "/default.jpg");
  });

  it("applies hover effect", () => {
    render(<FeaturedDeal deal={mockDeal} />);

    const dealElement = screen.getByRole("listitem");
    expect(dealElement).toHaveClass("deal");
  });
});