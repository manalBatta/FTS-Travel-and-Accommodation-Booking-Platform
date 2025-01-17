import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("btn");
    expect(button).not.toHaveClass("disabled");
  });

  it("renders enabled button and calls handleClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled={true} handleClick={handleClick}>
        Click Me
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("btn");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call handleClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled={false} handleClick={handleClick}>
        Click Me
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
