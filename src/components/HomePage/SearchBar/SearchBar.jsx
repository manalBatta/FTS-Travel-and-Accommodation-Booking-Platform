import { IoIosSearch } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { PiBabyLight } from "react-icons/pi";
import "./SearchBar.css";
import { useEffect, useRef } from "react";

const SearchBar = () => {
  // Get today's date in the format "YYYY-MM-DD"
  const today = new Date().toISOString().split("T")[0];

  // Get tomorrow's date by creating a new Date object and adding 1 day
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // Create refs to access the input elements
  const pickUpRef = useRef(null);
  const dropOffRef = useRef(null);
  useEffect(() => {
    if (pickUpRef.current) {
      pickUpRef.current.value = today;
    }
    if (dropOffRef.current) {
      dropOffRef.current.value = tomorrowStr;
    }
  }, []); // Empty dependency array since today and tomorrowStr won't change

  return (
    <div className="search-container">
      <h1>Discover the most engaging places</h1>
      <section className="search-bar">
        <IoIosSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for hotels, cities..."
          className="search-input"
        />
        <div className="search-details">
          <h2>When to Pick-up </h2>
          <input type="date" className="search-input" ref={pickUpRef} />
        </div>
        <div className="search-details">
          <h2>When to Drop-off </h2>
          <input type="date" className="search-input" ref={dropOffRef} />
        </div>
        <div className="search-details">
          <h2>Gusts </h2>
          <div className="gusts-details">
            <GoPeople />
            <input
              type="number"
              className="search-input"
              placeholder="2"
              min={1}
              max={100}
              style={{
                borderRight: "solid #BDBDBD 1px",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }}
            />
            <PiBabyLight />
            <input
              type="number"
              className="search-input"
              placeholder="1"
              min={1}
              max={100}
            />
          </div>
        </div>
        <div className="search-details rooms-details">
          <h2>Rooms </h2>
          <input
            type="number"
            className="search-input"
            placeholder="1"
            min={1}
            max={100}
          />
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
