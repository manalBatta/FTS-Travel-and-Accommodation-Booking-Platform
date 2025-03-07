import FeaturedDeals from "./FeaturedDeals";
import "./HomePage.css";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./SearchBar/SearchBar";
import RecentHotels from "./RecentHotels/RecentHotels";
import TrendingDestinations from "./TrendingDestinations/TrendingDestinations";
import { motion } from "framer-motion";
import Cart from "../Cart/Cart";

const HomePage = () => {
  return (
    <div className="home-page">
      <Cart></Cart>
      <header className="header-container">
        <Navbar
          navItems={[
            { name: "Search", link: "#" },
            { name: "Featured Deals", link: "#Featured" },
            { name: "Trending Destination", link: "#Trending" },
            { name: "Recently Visited", link: "#Recently" },
            { name: "Login", link: "/auth/login" },
          ]}
        ></Navbar>{" "}
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
          }}
        >
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
          }}
        >
          <RecentHotels></RecentHotels>
        </motion.article>
        <motion.article
          className="trending-destinations-container"
          id="Recent"
          initial={{ backgroundColor: "black", opacity: 0 }}
          whileInView={{
            backgroundColor: "white",
            opacity: 1,
            transition: { duration: 2 },
          }}
        >
          <TrendingDestinations></TrendingDestinations>
        </motion.article>
      </main>
      <footer></footer>
    </div>
  );
};
export default HomePage;
