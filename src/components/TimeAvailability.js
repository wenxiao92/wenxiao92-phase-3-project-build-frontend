import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BookingForm from "./BookingForm";
import Summary from "./Summary";

const TimeAvailability = ({propTimeslot, activityBookings}) => {
    const [selectedTimeslot, setSelectedTimeslot] = useState("")
    const [travelers, setTravelers] = useState([])
    const [selectedTimeslotBookings, setSelectedTimeslotBookings] = useState([])
    const [bookedTravelers, setBookedTravelers] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/travelers")
          .then((r) => r.json())
          .then((names) => setTravelers(names));
      }, []);

    const handleChange = (event) => {
      setSelectedTimeslot(event.target.value)
      const bookingsBasedOnTimeslot = activityBookings.filter((booking) => {
        return booking.timeslot === event.target.value
      })
      setSelectedTimeslotBookings(bookingsBasedOnTimeslot)
    };

    //handles edit form to edit later
    const handleBookedTravelers = (event) => {
      console.log(event.target.value)
      // const bookedTravelers = [...new Set(selectedTimeslotBookings.map((booking) => {
      //   return booking.traveler_id
      // }))]
    }



    const renderSummaryComponent = <Summary
      booking={selectedTimeslotBookings}
      allTravelers={travelers}
      handleBookedTravelers={handleBookedTravelers}
      />

    return(
        <div>
        <br></br>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="timeslot-select-label">Timeslots</InputLabel>
          <Select
            labelId="timeslot-select-label"
            id="timeslot-select"
            value={selectedTimeslot}
            label="Activity"
            onChange={handleChange}
          >
            {propTimeslot.map((timeslot) => (
                <MenuItem key={timeslot.id} value={timeslot}>
                {timeslot}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        <br></br>
        {selectedTimeslotBookings.length === 0 ? <h1>No Matching Bookings</h1> : renderSummaryComponent}
        <BookingForm />
        </div>
    )

}

export default TimeAvailability