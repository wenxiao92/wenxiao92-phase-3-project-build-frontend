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

    console.log(activityBookings, selectedTimeslotBookings)
    //will not persist in database
    // const bookedTravelerIds = activityBookings.filter((activity) => (
    //     activity.timeslot === chosenTimeslot
    // )).map(element => element.traveler_id)

    // const activityTimeslots = [...new Set(activityBookings.map((booking) => {
    //   return booking.timeslot
    // }))]

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
        <Summary/>
        <BookingForm />
        </div>
    )

}

export default TimeAvailability