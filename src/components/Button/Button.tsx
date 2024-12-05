import { buttonProps } from "../../Types";
import "./Button.css";
import { PropsWithChildren } from "react";

const Button = (props: PropsWithChildren<buttonProps>) => {
  const { disabled = true, handleClick, children } = props;

  return (
    <button
      className={`btn ${disabled ? "" : "disabled"}`}
      onClick={handleClick}
      disabled={!disabled}>
      {children}
    </button>
  );
};

export default Button;
