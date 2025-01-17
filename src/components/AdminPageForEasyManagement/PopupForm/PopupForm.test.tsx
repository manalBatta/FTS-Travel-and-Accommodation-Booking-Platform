import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PopupForm from "./PopupForm";
import "@testing-library/jest-dom";

describe("PopupForm Component", () => {
  const mockOnClose = jest.fn();
  const mockOnUpdate = jest.fn();

  const defaultProps = {
    isVisible: true,
    onClose: mockOnClose,
    onUpdate: mockOnUpdate,
    cityName: "Old City",
    cityDescription: "A historic place",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible", () => {
    render(<PopupForm {...defaultProps} />);
    expect(screen.getByText("Edit City")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Old City");
    expect(screen.getByLabelText("Description")).toHaveValue("A historic place");
  });

  it("does not render when not visible", () => {
    render(<PopupForm {...defaultProps} isVisible={false} />);
    expect(screen.queryByText("Edit City")).not.toBeInTheDocument();
  });

  it("updates name and description on input change", () => {
    render(<PopupForm {...defaultProps} />);
    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");

    fireEvent.change(nameInput, { target: { value: "New City" } });
    fireEvent.change(descriptionInput, { target: { value: "A modern place" } });

    expect(nameInput).toHaveValue("New City");
    expect(descriptionInput).toHaveValue("A modern place");
  });

  it("calls onUpdate and onClose when Update is clicked", () => {
    render(<PopupForm {...defaultProps} />);
    const updateButton = screen.getByText("Update");

    fireEvent.click(updateButton);

    expect(mockOnUpdate).toHaveBeenCalledWith("Old City", "A historic place");
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when Cancel is clicked", () => {
    render(<PopupForm {...defaultProps} />);
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
