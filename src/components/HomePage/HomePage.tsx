import "./HomePage.css";
import Navbar from "./Navbar/Navbar";
import { IoIosSearch } from "react-icons/io";
const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header-container">
        <Navbar></Navbar>
        <div className="search-container">
          <h1>Discover the most engaging places</h1>
          <section className="search-bar">
            <IoIosSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for hotels, cities..."
              className="search-input"
            />
            <div className="search-details">
              <h2>When to Pick-up </h2>
              <input type="date" className="search-input" />
            </div>
            <div className="search-details">
              <h2>When to Drop-off </h2>
              <input type="date" className="search-input" />
            </div>
            <div className="search-details w-100">
              <h2>Gusts </h2>
              <input type="number" className="search-input" value={2} />
            </div>
            <div className="search-details w-100">
              <h2>Rooms </h2>
              <input type="number" className="search-input" value={1} />
            </div>
          </section>
        </div>
      </header>
      <main>main content</main>
      <footer>footer copy write manal</footer>
    </div>
  );
};
export default HomePage;
