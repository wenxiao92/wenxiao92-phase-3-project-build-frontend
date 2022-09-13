import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BookingForm from "./BookingForm";
import CreateBooking from "./CreateBooking";
import EditBookingForm from "./EditBookingForm";
import { formatAvailability} from "../services/TimeslotFormat"
import EditBookingComponent from "./EditBookingComponent";

const TimeAvailability = ({propTimeslot, activityBookings, allowCheckBox}) => {
    const [selectedTimeslot, setSelectedTimeslot] = useState("")
    const [travelers, setTravelers] = useState([]) //all travelers
    const [selectedTimeslotBookings, setSelectedTimeslotBookings] = useState([]) //bookings of selected timeslot
    const [enableCheckBox, setEnableCheckBox] = useState([])
    const [enableAvailability, setEnableAvailability] = useState([])
    const [renderComponent, setRenderComponent] = useState(false)
    const [renderNames, setRenderNames] = useState(false)

    useEffect(() => {
        fetch("http://localhost:9292/travelers")
          .then((r) => r.json())
          .then((names) => setTravelers(names));
      }, []);

    //Change to handle what to render when timeslot is selected  
    const handleChange = (event) => {
      setSelectedTimeslot(event.target.value)
      const bookingsBasedOnTimeslot = activityBookings.filter((booking) => {
        return booking.timeslot === event.target.value
      })
      setSelectedTimeslotBookings(bookingsBasedOnTimeslot)

      // const findUnavailableTravelers = bookingsBasedOnTimeslot.map((booking) => {
      //   return booking.traveler_id.split(",")
      // }).flat().map((id) => parseInt(id))

      if(bookingsBasedOnTimeslot.length === 0){
        setRenderComponent(true)
      } else {
        setRenderComponent(false)
      }

      if(bookingsBasedOnTimeslot.length === 0){
        setRenderNames(false)
      } else {
        setRenderNames(true)
      }

      const findUnavailableTravelers = bookingsBasedOnTimeslot.map((booking) => {
        return booking.traveler_id.split(",")
      }).flat().map((id) => parseInt(id))
      setEnableCheckBox(findUnavailableTravelers)
      setEnableAvailability(findUnavailableTravelers)
    };

    //Shows name when "No Booking (Click here to create)"" is clicked on
    const handleDisplayNames = () => {
      setRenderNames((toggle) => !toggle)
    }

    //handle when a booking is clicked
    const handleBookedTravelers = (event) => {
      const travelerNameById = selectedTimeslotBookings.filter((booking) => booking.booking_name !== event.target.value).map((selectedBooking) => {
        return selectedBooking.traveler_id.split(",")
      }).flat().map((id) => parseInt(id))
      setEnableCheckBox(travelerNameById)
    }


    //sets a proxy status to determine render available vs non available travelers
    const reformatTravelers = travelers.map((traveler) => ({
      ...traveler,
      checkedStatus: formatAvailability(traveler, enableAvailability),
      checkAvailability: formatAvailability(traveler, enableCheckBox)
    }))
    
    console.log(enableCheckBox)
    
    //components set to a variable for conditional rendering
    const renderCreateBooking = <CreateBooking
      handleDisplayNames={handleDisplayNames}
    />
  
    const renderEditBookingFormComponent = <EditBookingForm
      booking={selectedTimeslotBookings} 
      allTravelers={travelers}
      handleBookedTravelers={handleBookedTravelers}
    />

    const renderBookingForm = <BookingForm
      unavailableTravelers={selectedTimeslotBookings}
      reformatTravelers={reformatTravelers}
      renderComponent={renderComponent}
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
        {renderComponent ? renderCreateBooking : null}
        {selectedTimeslotBookings.length === 0 ? null : renderEditBookingFormComponent}
        {renderNames ? renderBookingForm : null}
        {/* <BookingForm unavailableTravelers={selectedTimeslotBookings} reformatTravelers={reformatTravelers} allowCheckBox={allowCheckBox} renderNames={renderNames}/> */}
        </div>
    )

}

export default TimeAvailability