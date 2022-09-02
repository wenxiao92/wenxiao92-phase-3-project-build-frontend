import React from "react";
import { formatAvailability } from "../services/TimeslotFormat"
import CreateBooking from "./CreateBooking";

function BookingForm({allTravelers, unavailableTravelers}) {

    const findUnavailableTravelers = unavailableTravelers.map((booking) => {
        return booking.traveler_id
    })

    const reformatTravelers = allTravelers.map((traveler) => ({
        ...traveler,
        availability: formatAvailability(traveler, findUnavailableTravelers)
    }))

    const displayNames = reformatTravelers.map((traveler) => (
        <CreateBooking
            key={traveler.id}
            traveler={traveler}
        />
    ))


    return(
        <p>
            <h1>Available Participants:</h1>
            {displayNames}
        </p>
    )
}

export default BookingForm;