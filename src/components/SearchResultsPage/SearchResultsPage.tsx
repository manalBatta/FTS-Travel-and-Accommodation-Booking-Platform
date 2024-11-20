import { useEffect, useState } from "react";
import SearchBar from "../HomePage/SearchBar/SearchBar";
import "./SearchResultsPage.css";
import {
  RxDoubleArrowRight,
  RxDoubleArrowLeft,
  RxSketchLogo,
} from "react-icons/rx";
import { PiElevatorLight, PiStarHalfLight } from "react-icons/pi";
import { amenities, readFromReader, search, SearchDetails } from "../../APIs";
import { IoLocationOutline, IoHeartOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import { useLocation } from "react-router-dom";
type amenity = {
  name: string;
  description: string;
};
const SearchResultsPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchDetails = JSON.parse(
    decodeURIComponent(params.get("filter") || "{}")
  );

  const [collapse, setCollapse] = useState(true);
  const [amenitiesList, setAmenitiesList] = useState<amenity[]>([]);

  const getAmenities = async () => {
    const response = await amenities();
    const result: string | undefined = await readFromReader(response.clone());

    if (!result) {
      throw new Error("The response body is undefined or empty.");
    }
    const value = JSON.parse(result);
    setAmenitiesList(value);
  };

  const applyFilter = () => {
    const filter = document.getElementById("amenities") as HTMLSelectElement;
    const selectedValue = filter?.value;
    if (selectedValue !== "Amenities")
      console.log("Selected value:", selectedValue);
  };
  useEffect(() => {
    getAmenities();
    getSearchResult();
  }, []);

  const getSearchResult = async () => {
    const response = await search(searchDetails);
    const result: string | undefined = await readFromReader(response);
    if (!result) throw new Error("search result is undefined");
    const hotelsSearchResult = JSON.parse(result);
    console.log(
      "hotel search result from search result page",
      hotelsSearchResult
    );
  };
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
            <li>
              <PiElevatorLight style={{ color: "#CD6D00" }} />{" "}
              <input type="text" placeholder="Hotel" />
            </li>
            <li>
              <PiStarHalfLight style={{ color: "#ecbe09" }} />
              <input type="text" placeholder="Stars Rate" />
            </li>
          </ul>
        </article>
        <article className="result">
          <section className="result-header">
            <h2>Search Results</h2>
            <select name="sort" id="sort">
              <option value="ascending">Sort by</option>
              <option value="ascending">ascending</option>
              <option value="ascending">ascending</option>
            </select>
          </section>

          <ul className="result-body">
            <li className="hotel">
              <img src="/cover.png" alt="Hotel gallery" className="hotel-img" />
              <h3 className="hotel-name">the Peoples brownstone</h3>
              <button className="like-btn">
                <IoHeartOutline />
              </button>
              <h4 className="hotel-location">
                <IoLocationOutline style={{ fontSize: "1rem" }} />
                1995 Broadway, New York
              </h4>
              <span className="hotel-amenities">
                Wifi • Air conditioning • Kitchen • Heating • Smokers • Parking
                • Balcony • Animal friendly
              </span>
              <h5 className="rate">
                4.0
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar style={{ color: "#2b67f61f" }} />
              </h5>
              <h5 className="price">
                $3,000 <span className="note">/month</span>
              </h5>
            </li>
          </ul>
        </article>
      </div>
    </>
  );
};
export default SearchResultsPage;
