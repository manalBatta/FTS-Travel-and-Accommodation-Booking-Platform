import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { BrowserRouter as Router } from "react-router-dom";

// Mocking the necessary components for routing
const setup = () => {
  render(
    <Router>
      <SearchBar />
    </Router>
  );
};

describe("SearchBar Component", () => {
  it("renders all input fields correctly", () => {
    setup();

    // Check if search input is rendered
    expect(
      screen.getByPlaceholderText("Search for hotels, cities...")
    ).toBeInTheDocument();

    // Check if date inputs are rendered
    expect(screen.getByText("When to Pick-up")).toBeInTheDocument();
    expect(screen.getByText("When to Drop-off")).toBeInTheDocument();

    // Check if guests and rooms inputs are rendered
    expect(screen.getByPlaceholderText("2")).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("1")).toHaveLength(2);
  });

  it("updates search details state when inputs change", () => {
    setup();

    const cityInput = screen.getByPlaceholderText(
      "Search for hotels, cities..."
    );
    const adultsInput = screen.getByPlaceholderText("2");
    const childrenInput = screen.getAllByPlaceholderText("1")[0];
    const roomsInput = screen.getAllByPlaceholderText("1")[1];
    const checkInDateInput = screen.getByText("When to Pick-up")
      .nextSibling as HTMLElement;
    const checkOutDateInput = screen.getByText("When to Drop-off")
      .nextSibling as HTMLElement;

    // Simulate user input for the city
    fireEvent.change(cityInput, { target: { value: "Paris" } });
    expect(cityInput).toHaveValue("Paris");

    // Simulate user input for adults
    fireEvent.change(adultsInput, { target: { value: "3" } });
    expect(adultsInput).toHaveValue(3);

    // Simulate user input for children
    fireEvent.change(childrenInput, { target: { value: "2" } });
    expect(childrenInput).toHaveValue(2);

    // Simulate user input for rooms
    fireEvent.change(roomsInput, { target: { value: "2" } });
    expect(roomsInput).toHaveValue(2);

    // Simulate user input for check-in date
    fireEvent.change(checkInDateInput, { target: { value: "2025-12-01" } });
    expect(checkInDateInput).toHaveValue("2025-12-01");

    // Simulate user input for check-out date
    fireEvent.change(checkOutDateInput, { target: { value: "2025-12-10" } });
    expect(checkOutDateInput).toHaveValue("2025-12-10");
  });
});
