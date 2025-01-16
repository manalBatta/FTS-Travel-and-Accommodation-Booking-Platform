import React from "react";
import { City, Hotel } from "../../Types";
import { FcDeleteRow } from "react-icons/fc";
import { deleteCity, readFromReader, updateCity } from "../../APIs";
const CityTableRow: React.FC<{
  city: City;
  onEdit: (city: City) => void;
}> = ({ city, onEdit }) => {
  const remove = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm("Assert deleting " + city?.name + " city");
    if (confirmed) {
      const response = await deleteCity(city?.id);
      const result = await readFromReader(response);
      if (result) {
        window.alert("deleted " + city?.name + " city");
      }
    }
  };

  return (
    <>
      {city !== undefined && (
        <div className="table-row" onClick={() => onEdit(city)}>
          <span>{city?.name}</span>
          <span className="city-desc">{city?.description}</span>
          <span>{city?.hotels?.length || 0}</span>
          <span className="center-text">
            <FcDeleteRow size={25} onClick={remove} role="button" />
          </span>
        </div>
      )}
    </>
  );
};

export default CityTableRow;
