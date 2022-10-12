import React from "react";
import TextField from '@mui/material/TextField';
import SelectNames from "./SelectNames";

function BookingForm({reformatTravelers, editOrCreateButton, bookingName, setBookingName, handleSubmit, handleAddTraveler, cancelButtonStatus, handleCancelButton, travelerName, setTravelerName, handleAddName}) {

    return(
        <div>
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
            <button type="submit">{editOrCreateButton ? "Create Activity" : "Confirm Edit" }</button>
            {cancelButtonStatus? null : <button onClick={handleCancelButton} type="submit">Cancel Creating</button>} </p>
        </form>

            <h1>Available Participants:</h1>
            
        <form onSubmit={handleAddName}>
            <TextField
                id="outlined-required"
                label="Add a traveler"
                value={travelerName}
                onChange={setTravelerName}
            />
            <button>Add Name</button>
        </form>
        
            <SelectNames handleAddTraveler={handleAddTraveler} reformatTravelers={reformatTravelers} />
        </div>
    )
}

export default BookingForm;

{/* <form onSubmit={handleSubmit}>
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
<button type="submit">{editOrCreateButton ? "Create Activity" : "Confirm Edit" }</button>
{cancelButtonStatus? null : <button onClick={handleCancelButton} type="submit">Cancel Creating</button>} </p>
<h1>Available Participants:</h1>
<form onSubmit={handleAddName}>
<div>
<TextField
    id="outlined-required"
    label="Add a traveler"
    value={travelerName}
    onChange={setTravelerName}
/>
<button>Add Name</button>
</div></form>
<SelectNames handleAddTraveler={handleAddTraveler} reformatTravelers={reformatTravelers} />
</form> */}