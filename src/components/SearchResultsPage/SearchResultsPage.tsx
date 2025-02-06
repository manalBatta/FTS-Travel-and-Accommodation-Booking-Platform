import { useEffect, useState } from "react";
import SearchBar from "../HomePage/SearchBar/SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
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
  searchForAHotel,
} from "../../services/APIs";
import { SearchHotel, Hotel, Amenity } from "../../Types";
import { useLocation } from "react-router-dom";
import { MdOutlineManageSearch } from "react-icons/md";
import HotelCard from "../HotelCard/HotelCard";
import Cart from "../Cart/Cart";

const SearchResultsPage = () => {
  const location = useLocation();
  const [collapse, setCollapse] = useState(true);
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hasMore, setHasMore] = useState(true);
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
    try {
      const response = await amenities();
      const result: string | undefined = await readFromReader(response.clone());

      if (!result) {
        throw new Error("The response body is undefined or empty.");
      }
      const value = JSON.parse(result);
      setAmenitiesList(value);
    } catch (error) {
      console.error("Failed to fetch amenities:", error);
    }
  };

  const applyFilter = async () => {
    const response = await searchForAHotel(hotelSearch);
    const result: string | undefined = await readFromReader(response);
    if (result) {
      const hotelsSearchResult = JSON.parse(result);
      if (hotelSearch.pageNumber === 1) {
        setHotels(hotelsSearchResult);
      } else {
        setHotels((prev) => {
          return [...prev, ...hotelsSearchResult];
        });
      }
      setHasMore(hotelsSearchResult.length >= hotelSearch.pageSize);
    }
  };

  const getSearchResult = async () => {
    try {
      const searchParams = { ...location.state, ...specificSearch };
      const response = await search(searchParams);
      const result: string | undefined = await readFromReader(response);
      if (!result) throw new Error("search result is undefined");
      const hotelsSearchResult = JSON.parse(result);
      setHotels(hotelsSearchResult);
    } catch (error) {
      console.error("Failed to fetch search result:", error);
    }
  };

  const loadMoreHotels = () => {
    setHotelSearch((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
  };

  useEffect(() => {
    applyFilter();
  }, [hotelSearch.pageNumber]);

  useEffect(() => {
    getAmenitiesOptions();
  }, []);

  useEffect(() => {
    getSearchResult();
    console.log("triggered change");
  }, [location, specificSearch]);

  //sorting hotels by stare rating,price
  const sortedHotels = [...hotels].sort((a, b) => {
    if (specificSearch.sort === "starRating")
      return b.starRating - a.starRating;
    if (specificSearch.sort === "roomPrice") return a.roomPrice - b.roomPrice;
    return 0;
  });

  return (
    <>
      <div className="search-result-container">
        <Cart></Cart>
        <article className="search-bar-con">
          <SearchBar></SearchBar>
        </article>
        <article
          className="sidebar"
          style={collapse ? {} : { marginTop: "34px" }}
        >
          <div className="filter-header">
            {collapse && <h1>Filters</h1>}
            <button onClick={() => setCollapse((prev) => !prev)}>
              {collapse ? <RxDoubleArrowLeft /> : <RxDoubleArrowRight />}
            </button>
          </div>

          <ul
            className="filter-options"
            style={{ display: collapse ? "flex" : "none" }}
          >
            <li>
              <RxSketchLogo style={{ color: "#05AEEB" }} />
              <select
                name="Amenities"
                id="amenities"
                data-testid="amenities-toggle"
              >
                <option value="Amenities" title="Enjoy selecting amenities">
                  Amenities
                </option>
                {amenitiesList?.length !== 0 &&
                  amenitiesList.map((item) => (
                    <option
                      value={item.name}
                      title={item.description}
                      key={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </li>
            <li>
              <PiElevatorLight style={{ color: "#CD6D00" }} />
              <input
                type="text"
                placeholder="Hotel Name"
                onKeyUp={(e) => {
                  if (e.key === "Enter") applyFilter();
                }}
                onChange={(e) =>
                  setHotelSearch((prev) => {
                    return {
                      ...prev,
                      name: e.target.value.toString(),
                      pageNumber: 1,
                    };
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
                    return {
                      ...prev,
                      description: e.target.value,
                      pageNumber: 1,
                    };
                  })
                }
                onKeyUp={(e) => {
                  if (e.key === "Enter") applyFilter();
                }}
              />
            </li>
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
              }
            >
              <option value="roomPrice">Sort By</option>
              <option value="starRating">star Rate</option>
              <option value="roomPrice">price</option>
            </select>
          </section>
          <InfiniteScroll
            dataLength={hotels.length}
            next={loadMoreHotels}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <ul className="result-body" style={{ boxShadow: "none" }}>
              {(sortedHotels?.length &&
                sortedHotels
                  .filter(
                    (hotel) => hotel.starRating >= specificSearch.starRate
                  )
                  .map((hotel) => (
                    <HotelCard hotel={hotel} key={hotel.hotelId} />
                  ))) || (
                <img src="/Empty.svg" alt="loading" className="loading" />
              )}
            </ul>
          </InfiniteScroll>
        </article>
      </div>
    </>
  );
};
export default SearchResultsPage;
