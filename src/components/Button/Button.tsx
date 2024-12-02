import "./Button.css";
import { PropsWithChildren } from "react";

const Button = (props: PropsWithChildren) => {
  return <button className="btn ">{props.children}</button>;
};

export default Button;
