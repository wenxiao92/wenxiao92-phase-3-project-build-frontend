import React from "react";
import SummaryForm from "./SummaryForm";

const Summary = ({booking, handleBookedTravelers}) => {

    const bookingNames = [...new Set(booking.map((eachBooking) => {
        return eachBooking.booking_name
      }))]

    console.log(bookingNames)
    const bookingButton = bookingNames.map((eachBookingName) => (
        <SummaryForm
            key={eachBookingName.id}
            bookingName={eachBookingName}
            handleBookedTravelers={handleBookedTravelers}
        />
    ))

    return(
    <div>
        <h1>"Current Bookings:"</h1>
        {bookingButton}
    </div>
    )
}


export default Summary