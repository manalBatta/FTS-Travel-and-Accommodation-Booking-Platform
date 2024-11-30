import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { motion } from "motion/react";
import { mapArguments } from "../../../Types";

const MapWithDynamicData = (props: mapArguments) => {
  return (
    <motion.div
      className="map"
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1, transition: { duration: 0.4 } }}>
      {props.latitude ? (
        <MapContainer
          center={[props.latitude, props.longitude]}
          zoom={13}
          className="map-con">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[props.latitude, props.longitude]}>
            <Popup>{props.hotelName}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <img
          src="/homeCover.jpg"
          alt="loading map"
          style={{ height: "100%", margin: "0 auto" }}
        />
      )}
    </motion.div>
  );
};

export default MapWithDynamicData;
