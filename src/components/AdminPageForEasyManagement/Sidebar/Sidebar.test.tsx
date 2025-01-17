import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import "@testing-library/jest-dom";

describe("Sidebar Component", () => {
  it("renders correctly with default state", () => {
    render(<Sidebar />);

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Manage Cities")).toBeInTheDocument();
    expect(screen.getByText("Manage Hotels")).toBeInTheDocument();
    expect(screen.getByText("Manage Rooms")).toBeInTheDocument();
  });

  it("renders icons with the correct text", () => {
    render(<Sidebar />);

    expect(screen.getByText("Manage Cities").childNodes).toBeTruthy();
    expect(screen.getByText("Manage Hotels").childNodes).toBeTruthy();
    expect(screen.getByText("Manage Rooms").childNodes).toBeTruthy();
  });

  it("collapses and expands the sidebar on button click", () => {
    render(<Sidebar />);
    const collapseButton = screen.getByRole("button");

    fireEvent.click(collapseButton);
    expect(screen.queryByText("Filters")).not.toBeVisible();

    fireEvent.click(collapseButton);
    expect(screen.getByText("Filters")).toBeVisible();
  });
});
