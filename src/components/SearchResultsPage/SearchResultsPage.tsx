import { useEffect, useState } from "react";
import SearchBar from "../HomePage/SearchBar/SearchBar";
import "./SearchResultsPage.css";
import {
  RxDoubleArrowRight,
  RxDoubleArrowLeft,
  RxSketchLogo,
} from "react-icons/rx";
import { PiElevatorLight, PiStarHalfLight } from "react-icons/pi";
import { amenities, readFromReader, search, searchForAHotel } from "../../APIs";
import { SearchHotel, Hotel, Amenity } from "../../Types";

import { useLocation } from "react-router-dom";
import { MdOutlineManageSearch } from "react-icons/md";
import HotelCard from "../HotelCard/HotelCard";
import Cart from "../HotelPage/Cart/Cart";

const SearchResultsPage = () => {
  const location = useLocation();
  const [collapse, setCollapse] = useState(true);
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [specificSearch, setSpecificSearch] = useState({
    starRate: 1,
    sort: "desc",
  });
  const [hotelSearch, setHotelSearch] = useState<SearchHotel>({
    name: "",
    description: "",
    pageSize: 10,
    pageNumber: 1,
  });

  const getAmenitiesOptions = async () => {
    const response = await amenities();
    const result: string | undefined = await readFromReader(response.clone());

    if (!result) {
      throw new Error("The response body is undefined or empty.");
    }
    const value = JSON.parse(result);
    setAmenitiesList(value);
  };

  const applyFilter = async () => {
    // const filter = document.getElementById("amenities") as HTMLSelectElement;
    // const selectedValue = filter?.value;
    // if (selectedValue !== "Amenities")
    //   console.log("Selected value:", selectedValue);
    const response = await searchForAHotel(hotelSearch);
    const result: string | undefined = await readFromReader(response);
    if (!result) throw new Error("search result is undefined");
    const hotelsSearchResult = JSON.parse(result);
    setHotels(hotelsSearchResult);
    // console.log(
    //   "search for ",
    //   hotelSearch,
    //   "get the result",
    //   hotelsSearchResult
    // );
  };

  useEffect(() => {
    getAmenitiesOptions();
  }, []);

  useEffect(() => {
    getSearchResult();
    console.log("triggered change");
  }, [location, specificSearch]);

  const getSearchResult = async () => {
    const searchParams = { ...location.state, ...specificSearch };
    const response = await search(searchParams);
    const result: string | undefined = await readFromReader(response);
    if (!result) throw new Error("search result is undefined");
    const hotelsSearchResult = JSON.parse(result);
    setHotels(hotelsSearchResult);
  };

  //sorting hotels by stare rating,price
  hotels?.sort((a, b) => {
    const key = specificSearch.sort;

    if (key === "starRating") {
      return b.starRating - a.starRating;
    }
    if (key === "roomPrice") {
      return a.roomPrice - b.roomPrice;
    }
    return 0;
  });
  // console.log("from search result", hotels);
  return (
    <>
      <div className="search-result-container">
        <Cart></Cart>
        <article className="search-bar-con">
          <SearchBar></SearchBar>
          <img src="/logo.png" alt="2risem website Logo" className="logo" />
        </article>
        <article className="sidebar">
          <div className="filter-header">
            <h1>Filters</h1>
            <button onClick={() => setCollapse((prev) => !prev)}>
              {collapse ? <RxDoubleArrowLeft /> : <RxDoubleArrowRight />}
            </button>
          </div>

          <ul
            className="filter-options"
            style={{ display: collapse ? "flex" : "none" }}>
            <li>
              <button onClick={applyFilter}>Apply </button>
            </li>
            <li>
              <RxSketchLogo style={{ color: "#05AEEB" }} />
              <select name="Amenities" id="amenities">
                <option value="Amenities" title="Enjoy selecting amenities">
                  Amenities
                </option>
                {amenitiesList?.length !== 0 &&
                  amenitiesList.map((item) => (
                    <option
                      value={item.name}
                      title={item.description}
                      key={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </li>
            <li style={{ borderBottom: "none" }}>
              <PiElevatorLight style={{ color: "#CD6D00" }} />
              <input
                type="text"
                placeholder="Hotel Name"
                onKeyUp={(e) => {
                  if (e.key === "Enter") applyFilter();
                }}
                onChange={(e) =>
                  setHotelSearch((prev) => {
                    return { ...prev, name: e.target.value.toString() };
                  })
                }
              />
            </li>
            <li>
              <MdOutlineManageSearch />
              <input
                type="text"
                placeholder=" description..."
                onChange={(e) =>
                  setHotelSearch((prev) => {
                    return { ...prev, description: e.target.value };
                  })
                }
              />
            </li>
            {/* <li>
              <PiStarHalfLight style={{ color: "#ecbe09" }} />
              <input
                type="number"
                min={1}
                max={5}
                placeholder="Stars Rate"
                onChange={(e) =>
                  setSpecificSearch((prev) => {
                    return { ...prev, starRate: Number(e.target.value) };
                  })
                }
              />
            </li> */}
          </ul>
        </article>
        <article className="result">
          <section className="result-header">
            <h2>Search Results</h2>
            <div className="star-rate">
              <PiStarHalfLight style={{ color: "#ecbe09" }} />
              <input
                type="number"
                min={1}
                max={5}
                placeholder="Stars Rate"
                onChange={(e) =>
                  setSpecificSearch((prev) => {
                    return { ...prev, starRate: Number(e.target.value) };
                  })
                }
              />
            </div>
            <select
              name="sort"
              id="sort"
              onChange={(e) =>
                setSpecificSearch((prev) => {
                  return { ...prev, sort: e.target.value };
                })
              }>
              <option value="roomPrice">Sort By</option>
              <option value="starRating">star Rate</option>
              <option value="roomPrice">price</option>
            </select>
          </section>

          <ul className="result-body" style={{ boxShadow: "none" }}>
            {hotels?.length &&
              hotels.map((hotel) => {
                if (hotel.starRating < specificSearch.starRate) return "";
                // Client side filtering -due to server side issue filter is not working-.
                return (
                  <HotelCard hotel={hotel} key={hotel.hotelId}></HotelCard>
                );
              })}
          </ul>
        </article>
      </div>
    </>
  );
};
export default SearchResultsPage;
