import React, {useState} from "react";
import { formatAvailability, proxyState } from "../services/TimeslotFormat"
import TextField from '@mui/material/TextField';
import SelectNames from "./SelectNames";

function BookingForm({unavailableTravelers, reformatTravelers, renderComponent}) {
    const [stateForSubmit, setStateForSubmit] = useState([])
    const [bookingName, setBookingName] = useState("")
    //const [stateForBooking, setStateForBooking] = useState([])
    
    //variable to pull all traveler ID from array
    const findUnavailableTravelers = unavailableTravelers.map((booking) => {
        return booking.traveler_id
    })
    
    //pulls activity ID
    const findActivityId = [...new Set(unavailableTravelers.map((booking) => {
        return booking.activity_id
    }))]

    //pulls timeslot
    const findTimeSlot = [...new Set(unavailableTravelers.map((booking) => {
        return booking.timeslot
    }))]    

    //sets a proxy status to determine render available vs non available travelers
    
    //a proxy callback function used to determine whether the name is selected
    const handleAddTraveler = (e) => {
        proxyState(e, stateForSubmit, setStateForSubmit)
    }
    //console.log(stateForSubmit) //see which traveler is selected

    const displayNames = reformatTravelers.map((traveler) => (
        <SelectNames
            key={traveler.id}
            traveler={traveler}
            handleAddTraveler={handleAddTraveler}
            renderComponent={renderComponent}
        />
    ))
    
    return(
        <form>
            <br></br>
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

        // const handleCreateActivity = (e) => {
        //     e.preventDefault();
    
        //     for (let i=0; i<stateForSubmit.length; i++){
        //         fetch("http://localhost:9292/bookings", {
        //             method: "POST",
        //             headers: {
        //                 Accept: "application/json",
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({
        //                 booking_name: bookingName,
        //                 activity_id: findActivityId[0],
        //                 traveler_id: parseInt(stateForSubmit[i]),
        //                 timeslot: findTimeSlot[0]
        //             }),
        //         })
        //         .then((resp) => resp.json())
        //         .then((booking) => console.log(booking))
        //     }
        // }