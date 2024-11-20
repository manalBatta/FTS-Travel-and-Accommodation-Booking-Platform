import { IoIosSearch } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { PiBabyLight } from "react-icons/pi";
import "./SearchBar.css";
import { useState } from "react";
import { readFromReader, search, SearchDetails } from "../../../APIs";

const SearchBar = () => {
  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [searchDetails, setSearchDetails] = useState<SearchDetails>({
    checkInDate: todayStr,
    checkOutDate: tomorrowStr,
    city: "",
    numberOfRooms: 1,
    adults: 2,
    children: 1,
  });

  const getSearchResult = async () => {
    const response = await search(searchDetails);
    const reader = response.body?.getReader();
    readFromReader(reader);
  };

  const changeSearchDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name as keyof SearchDetails;
    const value =
      event.target.type === "number" ? +event.target.value : event.target.value;

    setSearchDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  return (
    <section className="search-bar">
      <button type="submit" onClick={getSearchResult} className="search-icon">
        <IoIosSearch />
      </button>
      <input
        type="text"
        placeholder="Search for hotels, cities..."
        className="search-input"
        value={searchDetails.city}
        onChange={changeSearchDetails}
        name="city"
      />
      <div className="search-details">
        <h2>When to Pick-up </h2>
        <input
          type="date"
          className="search-input"
          value={searchDetails.checkInDate}
          onChange={changeSearchDetails}
          name="checkInDate"
        />
      </div>
      <div className="search-details">
        <h2>When to Drop-off </h2>
        <input
          type="date"
          className="search-input"
          value={searchDetails.checkOutDate}
          onChange={changeSearchDetails}
          name="checkOutDate"
        />
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
            value={searchDetails.adults}
            onChange={changeSearchDetails}
            name="adults"
          />
          <PiBabyLight />
          <input
            type="number"
            className="search-input"
            placeholder="1"
            min={1}
            max={100}
            value={searchDetails.children}
            onChange={changeSearchDetails}
            name="children"
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
          value={searchDetails.numberOfRooms}
          onChange={changeSearchDetails}
          name="numberOfRooms"
        />
      </div>
    </section>
  );
};

export default SearchBar;
