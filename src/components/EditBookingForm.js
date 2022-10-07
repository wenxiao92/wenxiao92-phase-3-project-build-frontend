import React from "react";
import Summary from "./Summary";


const EditBookingForm = ({bookingNameArray, handleBookedTravelers, cancelButtonStatus, handleDelete}) => {
    const bookingButton = bookingNameArray.map((eachBookingName) => (
        <Summary
            key={eachBookingName}
            bookingName={eachBookingName}
            handleBookedTravelers={handleBookedTravelers}
            cancelButtonStatus={cancelButtonStatus}
            handleDelete={handleDelete}
        />
    ))

    return(
    <div>
        <h1>Current Bookings:</h1>
        {bookingButton}
    </div>
    )
}


export default EditBookingForm