import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar1">
      <button className="search-icon">
        {" "}
        <IoIosSearch />
      </button>
      <input type="text" placeholder="Search Users by Name, Email or Date" />
      <button className="create-btn">CREATE</button>
    </div>
  );
};

export default SearchBar;
