import React from "react";
import {  Hotel } from "../../Types";
import { FcDeleteRow } from "react-icons/fc";

const HotelTableRow: React.FC<{
  hotel: Hotel;
  onEdit: (hotel: Hotel) => void;
}> = ({ hotel, onEdit }) => {
  // const remove = async (e: React.SyntheticEvent) => {
  //   e.stopPropagation();
  //   const confirmed = window.confirm("Assert deleting" + hotel?.name + " hotel");
  //   if (confirmed) {
  //     const response = await deletehotel(hotel?.id);
  //     const result = await readFromReader(response);
  //     if (result) {
  //       window.alert("deleted " + hotel?.name + " hotel");
  //     }
  //   }
  // };

  return (
    <div className="table-row" onClick={() => onEdit(hotel)}>
      <span>{hotel?.hotelName}</span>
      <span className="hotel-desc">{hotel?.description}</span>
      <span>{hotel?.roomType}</span>
      <span className="center-text">
        <FcDeleteRow
          size={25}
          // onClick={remove}
        />
      </span>
    </div>
  );
};

export default HotelTableRow;
