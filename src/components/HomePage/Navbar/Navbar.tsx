import React from "react";
import "./Navbar.css";
import { NavbarProps } from "../../../Types";

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  user = { name: "nick", iconSrc: "/userIcon.png" },
}) => {
  return (
    <nav>
      <img src="/logo.png" alt="2risem website Logo" className="logo" />
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
      <div className="user-icon">
        <h2>{user.name}</h2>
        <img src={user.iconSrc} alt="User icon" />
      </div>
    </nav>
  );
};

export default Navbar;
