import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hotel, readFromReader, hotelGallery } from "../../services/APIs";
import { Hotel, initialHotel } from "../../Types";

const useHotelDetails = () => {
  const [hotelDetails, setHotelDetails] = useState<Hotel>(initialHotel);
  const location = useLocation();

  const getHotelDetails = async () => {
    const hotelId = +location.pathname.slice(8);

    const response = await hotel(hotelId);

    if (response.status !== 200) {
      console.error("Error fetching hotel details:", response);
      return;
    }

    console.log("body", response.body);

    const result = await readFromReader(response); //ready to show

    //get gallery
    const response2 = await hotelGallery(hotelId);

    if (response2.status !== 200) {
      if (result)
        setHotelDetails({
          ...JSON.parse(result),
          gallery: [],
        });
      console.error("Error fetching hotel gallery:", response2);
      return;
    }

    const gallery = await readFromReader(response2); //ready to show

    if (result && gallery) {
      try {
        //parse gallery
        const galleryContent = gallery.trim();

        const galleryArray = galleryContent.match(/\[(.*?)\]/);

        if (galleryArray && galleryArray[1]) {
          const items = galleryArray[1]
            .split("},")
            .map((item) => JSON.parse(item.endsWith("}") ? item : item + "}"));

          setHotelDetails({
            ...JSON.parse(result),
            gallery: items,
          });
        } else {
          console.error("Gallery format is invalid:", gallery);
          setHotelDetails({
            ...JSON.parse(result),
            gallery: [],
          });
        }
      } catch (error) {
        console.error("Error processing gallery or result:", error);
      }
    } else {
      console.warn("Missing required data: result or gallery is undefined.");
    }
  };

  useEffect(() => {
    getHotelDetails();
  }, [location]);

  return hotelDetails;
};

export default useHotelDetails;
