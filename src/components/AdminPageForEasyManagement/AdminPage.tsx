import React, { useEffect, useState } from "react";

import "./AdminPage.css";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import TableHeader from "./TableHeader";
import CityTableRow from "./CityTableRow";
import Pagination from "./Pagination";
import {
  getCities,
  getCity,
  readFromReader,
  searchForAHotel,
  updateCity,
} from "../../APIs";
import { City, Hotel } from "../../Types";
import PopupForm from "./PopupForm";
import HotelTableRow from "./HotelTableRow";

const AdminPage: React.FC = () => {
  const [cityTableData, setCityTableData] = useState<City[]>([]);
  const [hotelTableData, setHotelTableData] = useState<Hotel[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const cities = async () => {
    const response = await getCities({
      name: "",
      searchQuery: "",
      pageSize: 10,
      pageNumber: 1,
    });
    const result = await readFromReader(response);
    if (result) {
      const citiesList: City[] = JSON.parse(result);
      const updatedCitiesList = await Promise.all(
        citiesList.map(async (myCity) => {
          const updatedCity = await city(myCity);
          return updatedCity; // Return the updated city data
        })
      );
      setCityTableData(updatedCitiesList);
      // console.log(updatedCitiesList);
    }
  };

  const city = async (city: City) => {
    const response = await getCity(city.id);
    const result = await readFromReader(response);
    if (response.ok && result) {
      const city1 = JSON.parse(result);
      //console.log(city1);
      return city1;
    }
    return city;
  };
  const handleEdit = (city: City | undefined) => {
    setSelectedCity(city || null);
    setIsPopupVisible(true);
  };

  const handleUpdate = async (name: string, description: string) => {
    if (selectedCity) {
      const response = await updateCity(selectedCity);
      if (response.ok) window.alert("updated " + selectedCity.name + " city");
      //if the city is not found it will be 404
      else window.alert("couldn't update city server error");
    }
    setIsPopupVisible(false);
  };

  const handleClose = () => {
    setIsPopupVisible(false);
  };

  const hotels = async () => {
    const response = await searchForAHotel({
      name: "",
      description: "",
      pageSize: 10,
      pageNumber: 1,
    });
    const result = await readFromReader(response);
    if (response.ok && result) {
      setHotelTableData(JSON.parse(result));
      console.log(JSON.parse(result));
    }
  };
  useEffect(() => {
    cities();
    hotels();
  }, []);
  return (
    <div className="admin-page">
      <Sidebar />
      <main className="content">
        <SearchBar />
        <div className="table-container">
          <TableHeader headers={["name", "description", "number of hotels"]} />
          {cityTableData.map((row, index) => (
            <CityTableRow key={index} city={row} onEdit={handleEdit} />
          ))}
        </div>
        <div className="table-container">
          <TableHeader headers={["name", "star rate"]} />
          //we are here determeing the header fields of table hotels
          {hotelTableData.map((row, index) => (
            <HotelTableRow key={index} hotel={row} onEdit={() => {}} />
          ))}
        </div>
        <Pagination />
      </main>
      {isPopupVisible && selectedCity && (
        <PopupForm
          isVisible={isPopupVisible}
          onClose={handleClose}
          onUpdate={handleUpdate}
          cityName={selectedCity.name}
          cityDescription={selectedCity.description}
        />
      )}
    </div>
  );
};

export default AdminPage;
