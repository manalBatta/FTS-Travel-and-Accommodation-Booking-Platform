import "./HomePage.css";
const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header-container">
        <nav>
          <img src="./logo.png" alt="2risem website Logo" className="logo" />
          <ul>
            <li>
              <a href="#">Search</a>
            </li>
            <li>
              <a href="#Featured">Featured Deals</a>
            </li>{" "}
            <li>
              <a href="#Trending"> Trending Destination</a>
            </li>
            <li>
              <a href="#Recently">Recently Visited</a>
            </li>
          </ul>
          <div className="user-icon">
            <h2>Eva jonson</h2>{" "}
            <img src="./userIcon.png" alt="Female user icon" />
          </div>
        </nav>
      </header>
      <main>main content</main>
      <footer>footer copy write manal</footer>
    </div>
  );
};
export default HomePage;
