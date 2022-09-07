import React, { useState } from "react";
import Summary from "./Summary";


const EditBookingForm = ({booking, allTravelers}) => {

    const [bookedTravelersId, setBookedTravelersId] = useState([])

    const bookingNames = [...new Set(booking.map((eachBooking) => {
        return eachBooking.booking_name
      }))]

    // console.log(bookingNames)

    const handleBookedTravelers = (event) => {
        const travelerNameById = booking.filter((booking) => booking.booking_name === event.target.value).map((selectedBooking) => {
          return selectedBooking.traveler_id
        })
        setBookedTravelersId(travelerNameById)
      }

    


    const bookingButton = bookingNames.map((eachBookingName) => (
        <Summary
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


export default EditBookingForm