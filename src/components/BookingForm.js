import React, {useState} from "react";
import { formatAvailability, proxyState } from "../services/TimeslotFormat"
import CreateBooking from "./CreateBooking";

function BookingForm({allTravelers, unavailableTravelers}) {

    const [stateForSubmit, setStateForSubmit] = useState([])

    const findUnavailableTravelers = unavailableTravelers.map((booking) => {
        return booking.traveler_id
    })

    const reformatTravelers = allTravelers.map((traveler) => ({
        ...traveler,
        availability: formatAvailability(traveler, findUnavailableTravelers)
    }))

    const handleAddTraveler = (e) => {
        //proxyState(id, array, cb)
        proxyState(e, stateForSubmit, setStateForSubmit)
    }
    console.log(stateForSubmit)

    const displayNames = reformatTravelers.map((traveler) => (
        <CreateBooking
            key={traveler.id}
            traveler={traveler}
            handleAddTraveler={handleAddTraveler}
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