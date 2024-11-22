import { motion } from "motion/react";
import FeaturedDeals from "./FeaturedDeals";
import "./HomePage.css";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./SearchBar/SearchBar";
import RecentHotels from "./RecentHotels/RecentHotels";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header-container">
        <Navbar></Navbar>
        <div className="search-container">
          <h1>Discover the most engaging places</h1>
          <SearchBar></SearchBar>
        </div>
      </header>
      <main>
        <motion.article
          className="featured-deals-container"
          id="Featured"
          initial={{ backgroundColor: "black", opacity: 0 }}
          whileInView={{
            backgroundColor: "white",
            opacity: 1,
            transition: { duration: 2 },
          }}>
          <FeaturedDeals></FeaturedDeals>
        </motion.article>
        <motion.article
          className="recent-hotels-container"
          id="Recent"
          initial={{ backgroundColor: "black", opacity: 0 }}
          whileInView={{
            backgroundColor: "white",
            opacity: 1,
            transition: { duration: 2 },
          }}>
          <RecentHotels></RecentHotels>
        </motion.article>
      </main>
      <footer></footer>
    </div>
  );
};
export default HomePage;
