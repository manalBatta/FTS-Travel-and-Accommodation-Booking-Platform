import "./HomePage.css";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./SearchBar/SearchBar";

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
      <main>main content</main>
      <footer>footer copy write manal</footer>
    </div>
  );
};
export default HomePage;
