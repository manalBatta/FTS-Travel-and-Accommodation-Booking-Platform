import React, { useState } from "react";
import { MdOutlineHotel } from "react-icons/md";
import { LuHotel } from "react-icons/lu";
import { PiCityLight } from "react-icons/pi";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";

const Sidebar: React.FC = () => {
  const [collapse, setCollapse] = useState(true);

  return (
    <>
      <aside
        className="sidebar1"
        style={{ display: collapse ? "block" : "none" }}>
        <div className="filter-header1">
          <h1>Filters</h1>
        </div>
        <ul style={{ display: collapse ? "block" : "none" }}>
          <li>
            <PiCityLight /> Manage Cities
          </li>

          <li>
            <LuHotel /> Manage Hotels
          </li>
          <li>
            <MdOutlineHotel />
            Manage Rooms
          </li>
        </ul>
      </aside>{" "}
      <button
        onClick={() => setCollapse((prev) => !prev)}
        className="collapse-btn1">
        {collapse ? <RxDoubleArrowLeft /> : <RxDoubleArrowRight />}
      </button>
    </>
  );
};

export default Sidebar;
