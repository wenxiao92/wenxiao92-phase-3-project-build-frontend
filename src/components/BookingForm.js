import React, {useState} from "react";
import { formatAvailability, proxyState } from "../services/TimeslotFormat"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CreateBooking from "./CreateBooking";

function BookingForm({allTravelers, unavailableTravelers}) {
    const [stateForSubmit, setStateForSubmit] = useState([])
    const [bookingName, setBookingName] = useState("")
    
    //variable to pull all traveler ID from array
    const findUnavailableTravelers = unavailableTravelers.map((booking) => {
        return booking.traveler_id
    })
    
    //sets a proxy status to determine render available vs non available travelers
    const reformatTravelers = allTravelers.map((traveler) => ({
        ...traveler,
        availability: formatAvailability(traveler, findUnavailableTravelers)
    }))
    
    //a proxy callback function used to determine whether the name is selected
    const handleAddTraveler = (e) => {
        proxyState(e, stateForSubmit, setStateForSubmit)
    }
    //console.log(stateForSubmit) //see which traveler is selected
    
    const displayNames = reformatTravelers.map((traveler) => (
        <CreateBooking
            key={traveler.id}
            traveler={traveler}
            handleAddTraveler={handleAddTraveler}
        />
    ))
    
    // Set up JSON to post booking
    // const newBooking = {
    //     amount,
    //     date,
    //     donor,
    //     organization_id: organization,
    //     completed: false,
    // };
    
    // const configObj = {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newOrg),
    // };
    
    const handleCreateActivity = (e) => {
        e.preventDefault();

        console.log(stateForSubmit, bookingName)
    }

    return(
        <form onSubmit={handleCreateActivity}>
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Enter Booking Name"
                value={bookingName}
                onChange={(e) => setBookingName(e.target.value)}
            />
            <p>
            <button type="submit">Create Activity</button></p>
            <h1>Available Participants:</h1>
            {displayNames}
        </form>
    )
}

export default BookingForm;