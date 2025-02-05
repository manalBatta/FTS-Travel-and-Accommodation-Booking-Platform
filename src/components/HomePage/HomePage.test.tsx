import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <section {...props}>{children}</section>,
    article: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => <article {...props}>{children}</article>,
  },
}));

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

describe("HomePage Component", () => {
  test("renders Navbar with navigation items", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("You Recently been in")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders search section with heading", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Discover the most engaging places")).toBeInTheDocument();
  });

  test("renders Featured Deals section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Featured Deals/i)[0]).toBeInTheDocument();
  });

  test("renders Trending Destinations section", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Trending Destination/i)[0]).toBeInTheDocument();
  });
});
