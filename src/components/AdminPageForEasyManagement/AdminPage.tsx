import React, { useEffect, useState } from "react";

import "./AdminPage.css";
import Sidebar from "./Sidebar/Sidebar";
import SearchBar from "./SearchBar";
import TableHeader from "./TableHeader";
import CityTableRow from "./CityTableRow/CityTableRow";
import Pagination from "./Pagination";
import { getCities, getCity, readFromReader, updateCity } from "../../APIs";
import { City } from "../../Types";
import PopupForm from "./PopupForm/PopupForm";

const AdminPage: React.FC = () => {
  const [cityTableData, setCityTableData] = useState<City[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const cities = async () => {
    try {
      const response = await getCities({
        name: "",
        searchQuery: "",
        pageSize: 10,
        pageNumber: 1,
      });
      const result = await readFromReader(response);
      if (result) {
        const citiesList: City[] = JSON.parse(result);
        const detaildCitiesList = await Promise.all(
          citiesList.map(async (myCity) => {
            const updatedCity = await city(myCity);
            return updatedCity;
          })
        );
        setCityTableData(citiesList); //untill the API is ready use the citiesList instead of detaildCitiesList
        console.log(citiesList);
      }
    } catch (error) {
      console.log("Error in cities function", error);
    }
  };

  const city = async (city: City) => {
    try {
      const response = await getCity(city.id);
      const result = await readFromReader(response);
      if (response.ok && result) {
        const city1 = JSON.parse(result);
        return city1;
      }
      return city;
    } catch (error) {
      console.log("Error in city function", error);
      return city;
    }
  };
  const handleEdit = (city: City | undefined) => {
    setSelectedCity(city || null);
    setIsPopupVisible(true);
  };

  const handleUpdate = async () => {
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

  useEffect(() => {
    cities();
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
