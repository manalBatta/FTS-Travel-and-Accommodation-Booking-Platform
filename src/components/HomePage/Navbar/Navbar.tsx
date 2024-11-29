import "./Navbar.css";
const Navbar = () => {
  return (
    <nav>
      <img src="/logo.png" alt="2risem website Logo" className="logo" />
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
        <h2>Eva jonson</h2>
        <img src="/userIcon.png" alt="Female user icon" />
      </div>
    </nav>
  );
};

export default Navbar;
