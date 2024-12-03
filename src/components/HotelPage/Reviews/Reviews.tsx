import "./Reviews.css";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { Review } from "../../../Types";
import { useLocation } from "react-router-dom";
import { readFromReader, hotelReviews } from "../../../APIs";
import Button from "../../Button/Button";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [index, setIndex] = useState<number>(0);
  const location = useLocation();
  let hotelId;

  const getReviews = async () => {
    hotelId = +location.pathname.slice(8);
    const response = await hotelReviews(hotelId);
    const result = await readFromReader(response);
    if (result) setReviewsList(JSON.parse(result));
  };

  const nextReview = () => {
    setIndex((prev) => {
      return prev + 1 < reviewsList?.length ? prev + 1 : 0;
    });
  };

  const prevReview = () => {
    setIndex((prev) => {
      return prev > 0 ? prev - 1 : reviewsList?.length - 1;
    });
  };
  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 4000);

    return () => clearInterval(interval);
  }, [reviewsList]);

  let review: Review = reviewsList[index];
  return (
    <article className="reviews-con">
      <motion.h4
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}>
        Rating & Reviews
      </motion.h4>
      <section className="slider">
        <Button>
          <MdArrowBackIosNew onClick={prevReview} />
        </Button>
        {(reviewsList?.length && (
          <motion.div
            key={review.reviewId}
            className="rev-con"
            initial={{ opacity: 0.5 }}
            whileInView={{ scale: [null, 1.1, 1], opacity: 1 }}
            transition={{ duration: 0.4 }}>
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
          </motion.div>
        )) ||
          "hi"}
        <Button>
          <MdArrowForwardIos onClick={nextReview} />
        </Button>
      </section>
    </article>
  );
};

export default Reviews;
