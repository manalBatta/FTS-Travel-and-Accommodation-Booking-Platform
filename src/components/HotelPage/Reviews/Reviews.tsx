import "./Reviews.css";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { Review } from "../../../Types";
import { useLocation } from "react-router-dom";
import { readFromReader, hotelReviews } from "../../../APIs";

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const location = useLocation();
  let hotelId;

  const getReviews = async () => {
    hotelId = +location.pathname.slice(8);
    const response = await hotelReviews(hotelId);
    const result = await readFromReader(response);
    if (result) setReviewsList(JSON.parse(result));
  };

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <article className="reviews-con">
      <motion.h4
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}>
        Rating & Reviews
      </motion.h4>

      {reviewsList?.length &&
        reviewsList.map((review) => {
          return (
            <div className="rev-con">
              <div className="rev-header">
                <h1>{review?.customerName}</h1>
                <span>
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <IoMdStar
                        key={index}
                        style={{
                          color: index < review?.rating ? "gold" : "#2b67f61f",
                        }}
                      />
                    ))}
                </span>
              </div>
              <p>{review?.description}</p>
            </div>
          );
        })}
    </article>
  );
};

export default Reviews;
