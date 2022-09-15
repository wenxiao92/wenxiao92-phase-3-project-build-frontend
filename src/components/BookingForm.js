import React from "react";
import TextField from '@mui/material/TextField';
import SelectNames from "./SelectNames";

function BookingForm({reformatTravelers, renderComponent, editOrCreateButton, bookingName, setBookingName, handleSubmit, handleAddTraveler}) {

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
            <SelectNames handleAddTraveler={handleAddTraveler} reformatTravelers={reformatTravelers} renderComponent={renderComponent} />
            {/* {displayNames} */}
        </form>
    )
}

export default BookingForm;