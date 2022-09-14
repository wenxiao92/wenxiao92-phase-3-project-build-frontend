import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BookingForm from "./BookingForm";
import CreateBooking from "./CreateBooking";
import EditBookingForm from "./EditBookingForm";
import { formatAvailability, proxyState} from "../services/TimeslotFormat"

const TimeAvailability = ({propTimeslot, activityBookings}) => {
    const [selectedTimeslot, setSelectedTimeslot] = useState("")
    const [travelers, setTravelers] = useState([]) //all travelers
    const [selectedTimeslotBookings, setSelectedTimeslotBookings] = useState([]) //bookings of selected timeslot
    const [enableCheckBox, setEnableCheckBox] = useState([]) //changes array of traveler's chkbox status
    const [enableAvailability, setEnableAvailability] = useState([])
    const [renderComponent, setRenderComponent] = useState(false)
    const [renderNames, setRenderNames] = useState(false)
    const [editOrCreateButton, setEditOrCreateButton] = useState(true)
    const [bookingName, setBookingName] = useState("") //changes booking name of Edit or Create
    const [stateForSubmit, setStateForSubmit] = useState([]) //state to determine which traveler is selected
    const [activityID, setActivityID] = useState([]) //set state due to posting resets array to blank
    const [bookingNameArray, setBookingNameArray] = useState([]) //set state due to posting resets array to blank

    useEffect(() => {
        fetch("http://localhost:9292/travelers")
          .then((r) => r.json())
          .then((names) => setTravelers(names));
      }, []);


//---------------------------------------Handle Functions---------------------------------------------------
    //Change to handle what to render when timeslot is selected  
    const handleChange = (event) => {
      setSelectedTimeslot(event.target.value)
      const bookingsBasedOnTimeslot = activityBookings.filter((booking) => {
        return booking.timeslot === event.target.value
      })
      setSelectedTimeslotBookings(bookingsBasedOnTimeslot)

      //set activity ID to state due to error after posting
      const findActivityId = [...new Set(activityBookings.map((booking) => {
        return booking.activity_id
      }))]
      setActivityID(findActivityId)

      //set Booking name array to state due to error after posting
      // const bookingNames = [...new Set(activityBookings.map((eachBooking) => {
      //   return eachBooking.booking_name
      // }))]
      const bookingNames = [...new Set(activityBookings.filter((eachBooking) => {
        return eachBooking.timeslot === event.target.value
      }).map((booking) => {return booking.booking_name}))]
      setBookingNameArray(bookingNames)

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
      setEnableAvailability(findUnavailableTravelers)
      setEnableCheckBox(findUnavailableTravelers)
    };

    //Shows name when "No Booking (Click here to create)"" is clicked on
    const handleDisplayNames = () => {
      setRenderNames((toggle) => !toggle)
      setBookingName("")
      setRenderComponent((toggle) => !toggle)
    }

    //handle when a booking is clicked
    const handleBookedTravelers = (event) => {
      const travelerNameById = selectedTimeslotBookings.filter((booking) => booking.booking_name !== event.target.value).map((selectedBooking) => {
        return selectedBooking.traveler_id.split(",")
      }).flat().map((id) => parseInt(id))
      setEnableAvailability(travelerNameById)
      setBookingName(event.target.value)

      if(event.target.value.length > 0){
        setEditOrCreateButton(true)
      } else {
        setEditOrCreateButton(false)
      }

      setEditOrCreateButton((toggle) => !toggle)
    }

    //callback function to determine which person is selected
    const handleAddTraveler = (e) => {
      proxyState(e, stateForSubmit, setStateForSubmit)
    }
    //console.log(stateForSubmit) //see which traveler is selected

    //form submission
    const handleSubmit = (e) => {
      e.preventDefault()

      if(bookingName.length > 0) {
        setEditOrCreateButton(true)
      } else {
        setEditOrCreateButton(false)
      }

      setBookingName("")

      //POST or PATCH
      {editOrCreateButton ? (
      fetch("http://localhost:9292/bookings", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_name: bookingName,
          activity_id: activityID[0],
          traveler_id: stateForSubmit.toString(),
          timeslot: selectedTimeslot
        }),
      })
      .then((resp) => resp.json())
      .then((booking) => {
        if(selectedTimeslotBookings.length === 0){
          setSelectedTimeslotBookings([booking])
        }

        const revisedNameArray = bookingNameArray.concat(booking.booking_name)
        setBookingNameArray(revisedNameArray)

        const revisedAvailability = booking.traveler_id.split(",").map((id) => parseInt(id))
        setEnableAvailability(enableAvailability.concat(revisedAvailability))
      })) : (
        console.log("test")
      )}
  }
//---------------------------------------Handle Functions END-----------------------------------------------  
  
    //sets a proxy status to determine render available vs non available travelers
    const reformatTravelers = travelers.map((traveler) => ({
      ...traveler,
      checkedStatus: formatAvailability(traveler, enableCheckBox),
      checkAvailability: formatAvailability(traveler, enableAvailability)
    }))
    
    //components set to a variable for conditional rendering
    const renderCreateBooking = <CreateBooking
      handleDisplayNames={handleDisplayNames}
    />
  
    const renderEditBookingFormComponent = <EditBookingForm
      bookingNameArray={bookingNameArray} 
      allTravelers={travelers}
      handleBookedTravelers={handleBookedTravelers}
    />

    const renderBookingForm = <BookingForm
      unavailableTravelers={selectedTimeslotBookings}
      reformatTravelers={reformatTravelers}
      renderComponent={renderComponent}
      editOrCreateButton={editOrCreateButton}
      handleSubmit={handleSubmit}
      bookingName={bookingName}
      setBookingName={(e) => setBookingName(e.target.value)}
      handleAddTraveler={handleAddTraveler}
    />

    console.log(enableCheckBox, enableAvailability)

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