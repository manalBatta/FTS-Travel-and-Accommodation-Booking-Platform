import { useEffect, useState } from "react";
import SearchBar from "../HomePage/SearchBar/SearchBar";
import "./SearchResultsPage.css";
import {
  RxDoubleArrowRight,
  RxDoubleArrowLeft,
  RxSketchLogo,
} from "react-icons/rx";
import { PiElevatorLight, PiStarHalfLight } from "react-icons/pi";
import { amenities, readFromReader } from "../../APIs";

type amenity = {
  name: string;
  description: string;
};
const SearchResultsPage = () => {
  const [collapse, setCollapse] = useState(false);
  const [amenitiesList, setAmenitiesList] = useState<amenity[]>([]);

  const getAmenities = async () => {
    const response = await amenities();
    const result: string | undefined = await readFromReader(response.clone());

    if (!result) {
      throw new Error("The response body is undefined or empty.");
    }
    const value = JSON.parse(result);
    console.log("from result", value);
    setAmenitiesList(value);
  };

  useEffect(() => {
    getAmenities();
  }, []);
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
            {collapse ? <RxDoubleArrowRight /> : <RxDoubleArrowLeft />}
          </div>
          <ul className="filter-options">
            <li>
              <RxSketchLogo style={{ color: "#05AEEB" }} />{" "}
              <select name="Amenities" id="amenities">
                <option value="Amenities" title="Enjoy selecting amenities">
                  Amenities
                </option>
                {amenitiesList?.length !== 0 &&
                  amenitiesList.map((item) => (
                    <option value={item.name} title={item.description}>
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
        <article className="result"></article>
      </div>
    </>
  );
};
export default SearchResultsPage;
