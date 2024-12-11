import { useContext, useEffect, useState } from "react";
import "./CheckoutPage.css";
import { CartContext } from "../context/cart";
import { BookingDetails, RoomType } from "../../Types";
import { bookRoom, readFromReader, roomDetails } from "../../APIs";
import { getUser } from "../../Helpers";
import Room from "../HotelPage/Room/Room";
import PaymentForm from "./PaymentForm/PaymentForm";

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const [roomsINCart, setRoomsINCart] = useState<RoomType[]>([]);

  const getRoomsDetails = async () => {
    try {
      const RoomsDetails = await Promise.all(
        cartItems.map(async (item) => {
          const response = await roomDetails(item.id);
          const result = await readFromReader(response);
          return result ? JSON.parse(result) : null;
        })
      );

      // Set the resolved data to state
      setRoomsINCart(RoomsDetails);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const getCartTotal = () => {
    return roomsINCart.reduce((total, item) => total + item.price, 0); // calculate the total price of the items in the cart
  };

  const executePayment = async () => {
    const user = getUser();
    for (let i = 0; i < cartItems.length; i++) {
      const requestBody: BookingDetails = {
        customerName: user?.given_name,
        hotelName: cartItems[i]?.hotelName,
        roomNumber: roomsINCart[i]?.roomNumber.toString(),
        roomType: roomsINCart[i]?.roomType,
        bookingDateTime: new Date().toISOString(),
        totalCost: roomsINCart[i]?.price,
        paymentMethod: "card",
      };
      console.log("requst body", requestBody);
      const response = await bookRoom(requestBody);
      const result = await readFromReader(response);
      console.log("result of payment", result); //the response is unauthorized for all the requests How to be authorized
    }
  };
  useEffect(() => {
    getRoomsDetails();
    executePayment();
  }, []);
  return (
    <>
      <div className="checkout-con">
        <header>
          <img src="logoBlack.png" alt="logo of tourism" />
        </header>
        <main>
          <section className="booking-summery">
            <h1>Booking Summery</h1>
            <div className="rooms-to-book">
              {roomsINCart?.length &&
                roomsINCart.map((room, index) => {
                  return (
                    <Room
                      key={cartItems[index] && room.roomId}
                      room={room}
                      hotelName={cartItems[index]?.hotelName}
                      details={true}></Room>
                  );
                })}
            </div>
            <h2>Total Payment:${getCartTotal()}</h2>
          </section>
          <section className="payment-details">
            <PaymentForm pay={executePayment}></PaymentForm>
          </section>
        </main>
      </div>
    </>
  );
};

export default CheckoutPage;
