import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";

describe("Navbar Component", () => {
  const mockNavItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const mockUser = {
    name: "Manal",
    iconSrc: "/customUserIcon.png",
  };

  it("renders the logo", () => {
    render(<Navbar navItems={mockNavItems} />);
    const logoElement = screen.getByAltText("2risem website Logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute("src", "/logo.png");
  });

  it("renders navigation items", () => {
    render(<Navbar navItems={mockNavItems} />);
    mockNavItems.forEach((item) => {
      const navItem = screen.getByText(item.name);
      expect(navItem).toBeInTheDocument();
      expect(navItem.closest("a")).toHaveAttribute("href", item.link);
    });
  });

  it("renders default user when no user prop is provided", () => {
    render(<Navbar navItems={mockNavItems} />);
    const userName = screen.getByText("nick");
    const userIcon = screen.getByAltText("User icon");

    expect(userName).toBeInTheDocument();
    expect(userIcon).toBeInTheDocument();
    expect(userIcon).toHaveAttribute("src", "/userIcon.png");
  });

  it("renders provided user information", () => {
    render(<Navbar navItems={mockNavItems} user={mockUser} />);
    const userName = screen.getByText(mockUser.name);
    const userIcon = screen.getByAltText("User icon");

    expect(userName).toBeInTheDocument();
    expect(userIcon).toBeInTheDocument();
    expect(userIcon).toHaveAttribute("src", mockUser.iconSrc);
  });

  it("renders the correct number of navigation items", () => {
    render(<Navbar navItems={mockNavItems} />);
    const navItems = screen.getAllByRole("listitem");
    expect(navItems).toHaveLength(mockNavItems.length);
  });
});
