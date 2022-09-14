import React, {useState} from "react";
import { formatAvailability, proxyState } from "../services/TimeslotFormat"
import TextField from '@mui/material/TextField';
import SelectNames from "./SelectNames";

function BookingForm({reformatTravelers, renderComponent, editOrCreateButton, bookingName, setBookingName, handleSubmit, handleAddTraveler}) {

    const displayNames = reformatTravelers.map((traveler) => (
        <SelectNames
            key={traveler.id}
            traveler={traveler}
            handleAddTraveler={handleAddTraveler}
            renderComponent={renderComponent}
        />
    ))
    
    return(
        <form onSubmit={handleSubmit}>
            <br></br>
            <TextField
                required
                id="outlined-required"
                label="Required"
                defaultValue="Enter Booking Name"
                value={bookingName}
                onChange={setBookingName}
            />
            <p>
            <button type="submit">{editOrCreateButton ? "Create Activity" : "Confirm Edit" }</button></p>
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