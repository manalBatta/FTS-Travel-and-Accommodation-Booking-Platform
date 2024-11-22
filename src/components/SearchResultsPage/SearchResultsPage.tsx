import { useEffect, useState } from "react";
import SearchBar from "../HomePage/SearchBar/SearchBar";
import "./SearchResultsPage.css";
import {
  RxDoubleArrowRight,
  RxDoubleArrowLeft,
  RxSketchLogo,
} from "react-icons/rx";
import { PiElevatorLight, PiStarHalfLight } from "react-icons/pi";
import {
  amenities,
  readFromReader,
  search,
  SearchDetails,
  searchForAHotel,
  SearchHotel,
} from "../../APIs";
import { IoLocationOutline, IoHeartOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { MdOutlineManageSearch } from "react-icons/md";
type Amenity = {
  id: number;
  name: string;
  description: string;
};

type Hotel = {
  hotelId: number;
  amenities: Amenity[];
  cityName: string;
  discount: number;
  hotelName: string;
  latitude: number;
  longitude: number;
  roomPhotoUrl: string;
  roomPrice: number;
  roomType: string;
  starRating: number;
  description: string;
};

const SearchResultsPage = () => {
  const location = useLocation();
  const [collapse, setCollapse] = useState(true);
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [specificSearch, setSpecificSearch] = useState({
    starRate: 5,
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
    console.log(
      "search for ",
      hotelSearch,
      "get the result",
      hotelsSearchResult
    );
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
  hotels.sort((a, b) => {
    const key = specificSearch.sort;

    if (key === "starRating") {
      return b.starRating - a.starRating;
    }
    if (key === "roomPrice") {
      return a.roomPrice - b.roomPrice;
    }
    return 0;
  });
  return (
    <>
      <div className="search-result-container">
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

          <ul className="result-body">
            {hotels?.length &&
              hotels.map((hotel) => {
                if (hotel.starRating < specificSearch.starRate) return ""; // client side filtering (due to server side issue filter is not working)

                return (
                  <li className="hotel" key={hotel?.hotelId?.toString()}>
                    <img
                      src={hotel.roomPhotoUrl || "/default.jpg"}
                      alt="Hotel gallery"
                      className="hotel-img"
                    />
                    <h3 className="hotel-name">
                      {hotel.hotelName || hotel.description}
                    </h3>
                    <button className="like-btn ">
                      <IoHeartOutline />
                    </button>
                    <h4 className="hotel-location">
                      <IoLocationOutline style={{ fontSize: "1rem" }} />
                      {hotel.cityName}
                    </h4>
                    <span className="hotel-amenities">
                      {hotel?.amenities
                        ?.map((amenity: Amenity) => amenity.name)
                        .join(" • ")}
                    </span>

                    <h5 className="rate">
                      {hotel?.starRating?.toString()}
                      {Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <IoMdStar
                            key={index}
                            style={{
                              color:
                                index < hotel.starRating ? "gold" : "#2b67f61f",
                            }}
                          />
                        ))}
                    </h5>
                    <h6 className="price">
                      {/* To fix error undefined to string when search */}$
                      {hotel?.roomPrice?.toString()}
                      <span className="note">/night</span>
                    </h6>
                  </li>
                );
              })}
          </ul>
        </article>
      </div>
    </>
  );
};
export default SearchResultsPage;
