import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion"; 
import { mapArguments } from "../../../Types";
import "./Map.css";
import L from "leaflet";

const MapWithDynamicData = (props: mapArguments) => {
  const [attractions, setAttractions] = useState<any[]>([]);

  console.log(props);
  useEffect(() => {
    if (props.latitude && props.longitude) {
      const overpassQuery = `
        [out:json];
        node[tourism=attraction](around:1500,${props.latitude},${props.longitude});
        out;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        overpassQuery
      )}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const attractionsData = data.elements.map((el: any) => ({
            id: el.id,
            name: el.tags?.name || "Unnamed Attraction",
            lat: el.lat,
            lon: el.lon,
          }));
          setAttractions(attractionsData);
        })
        .catch((error) => {
          console.error("Error fetching attractions:", error);
        });
    }
  }, [props.latitude, props.longitude]);

  const hotelIcon = new L.Icon({
    iconUrl: "/red.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const attractionIcon = new L.Icon({
    iconUrl: "/black.webp",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  return (
    <article className="map-description-con" id="Description">
      <motion.div
        className="map"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1, transition: { duration: 0.4 } }}>
        {props.latitude && props.longitude ? (
          <MapContainer
            center={[props.latitude, props.longitude]}
            zoom={13}
            className="map-con">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[props.latitude, props.longitude]}
              icon={hotelIcon}>
              <Popup>{props.hotelName}</Popup>
            </Marker>
            {/* Render nearby attractions markers */}
            {attractions.map((attraction) => (
              <Marker
                icon={attractionIcon}
                key={attraction.id}
                position={[attraction.lat, attraction.lon]}>
                <Popup>{attraction.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <img
            src="/homeCover.jpg"
            alt="loading map"
            style={{ height: "100%", margin: "0 auto" }}
          />
        )}
      </motion.div>

      <section>
        <motion.h3
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1, transition: { duration: 0.2 } }}>
          Description
        </motion.h3>
        <motion.p
          className="note"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1, transition: { duration: 0.4 } }}>
          {props.description}
        </motion.p>
      </section>
    </article>
  );
};

export default MapWithDynamicData;
