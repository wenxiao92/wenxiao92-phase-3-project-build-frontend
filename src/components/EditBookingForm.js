import React from "react";
import Summary from "./Summary";


const EditBookingForm = ({bookingNameArray, handleBookedTravelers}) => {



    const bookingButton = bookingNameArray.map((eachBookingName) => (
        <Summary
            key={eachBookingName.id}
            bookingName={eachBookingName}
            handleBookedTravelers={handleBookedTravelers}
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