import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";
import { Reservation } from "../../../Types";

/////you just have to decorate the confirmation page well done

const ConfirmationPage = () => {
  const location = useLocation();
  const reservations: Reservation[] = location.state;

  const handlePrint = () => {
    window.print();
  };
  const navigator = useNavigate();

  return (
    <div className="confirmation-page">
      <h1>Your Reservations</h1>
      <div className="reservations-container">
        {reservations.map((reservation, index) => (
          <div key={index} className="reservation-card">
            <h2>Reservation {index + 1}</h2>
            <p>
              <span>Customer Name:</span> {reservation.customerName}
            </p>
            <p>
              <span>Hotel Name:</span> {reservation.hotelName}
            </p>
            <p>
              <span>Room Number:</span> {reservation.roomNumber}
            </p>
            <p>
              <span>Room Type:</span> {reservation.roomType}
            </p>
            <p>
              <span>Booking Date:</span>{" "}
              {new Date(reservation.bookingDateTime).toLocaleString()}
            </p>
            <p>
              <span>Total Cost:</span> ${reservation.totalCost.toFixed(2)}
            </p>
            <p>
              <span>Payment Method:</span> {reservation.paymentMethod}
            </p>
            <p>
              <span>Booking Status:</span> {reservation.bookingStatus}
            </p>
            <p>
              <span>Confirmation Number:</span> {reservation.confirmationNumber}
            </p>
          </div>
        ))}
      </div>
      <button className="print-button" onClick={handlePrint}>
        Print Report
      </button>{" "}
      <button className="print-button" onClick={() => navigator("/")}>
        Home
      </button>
    </div>
  );
};

export default ConfirmationPage;
