import SearchBar from "../HomePage/SearchBar/SearchBar";
import "./SearchResultsPage.css";
const SearchResultsPage = () => {
  return (
    <>
      <div className="search-result-container">
        <article className="search-bar">
          <SearchBar></SearchBar>
          <img src="./logo.png" alt="2risem website Logo" className="logo" />
        </article>
        <article className="sidebar"></article>
        <article className="result"></article>
      </div>
    </>
  );
};
export default SearchResultsPage;
