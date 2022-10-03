import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BookingForm from "./BookingForm";
import CreateBooking from "./CreateBooking";
import EditBookingForm from "./EditBookingForm";
import { formatAvailability, proxyState, changeCheckBoxStatus} from "../services/TimeslotFormat"

const TimeAvailability = ({propTimeslot, activityBookings}) => {
    const [selectedTimeslot, setSelectedTimeslot] = useState("")
    const [travelers, setTravelers] = useState([]) //all travelers
    const [selectedTimeslotBookings, setSelectedTimeslotBookings] = useState([]) //bookings of selected timeslot
    const [renderComponent, setRenderComponent] = useState(false) //render component when condition is met
    const [renderNames, setRenderNames] = useState(false) //render component when condition is met
    const [editOrCreateButton, setEditOrCreateButton] = useState(true)
    const [cancelButton, setCancelButton] = useState(true)
    const [bookingName, setBookingName] = useState("") //changes booking name of Edit or Create
    const [stateForSubmit, setStateForSubmit] = useState([]) //state to determine which traveler is selected
    const [activityID, setActivityID] = useState([]) //set state due to posting resets array to blank
    const [bookingNameArray, setBookingNameArray] = useState([]) //set state due to posting resets array to blank
    const [objForChkBox, setObjForChkBox] = useState([]) 
    const [bookingSelected, setBookingSelected] = useState(0) //for delete and patch
    

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

      //returns booking names and put into Array after posting
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

      if(bookingsBasedOnTimeslot.length === 0){
        setEditOrCreateButton(false)
      } else {
        setEditOrCreateButton(true)
      }
      
      const findUnavailableTravelers = bookingsBasedOnTimeslot.map((booking) => {
        return booking.traveler_id.split(",")
      }).flat().map((id) => parseInt(id))
      const reformatTravelers = travelers.map((traveler) => ({
        ...traveler,
        checkedStatus: formatAvailability(traveler, findUnavailableTravelers),
        checkAvailability: formatAvailability(traveler, findUnavailableTravelers)
      }))
      setObjForChkBox(reformatTravelers)
    };

    //Shows proper naming of buttons when button is clicked on
    const handleDisplayNames = () => {
      setRenderNames((toggle) => !toggle)
      setBookingName("")
      setRenderComponent((toggle) => !toggle)
      setEditOrCreateButton((toggle) => !toggle)
    }

    //handle when a booking is clicked
    const handleBookedTravelers = (event) => {
            
      //sets new object
      const travelerNameById = selectedTimeslotBookings.filter((booking) => booking.booking_name !== event.target.value).map((selectedBooking) => {
        return selectedBooking.traveler_id.split(",")
      }).flat().map((id) => parseInt(id))

      const findUnavailableTravelers = selectedTimeslotBookings.map((booking) => {
        return booking.traveler_id.split(",")
      }).flat().map((id) => parseInt(id))
      const reformatTravelers = travelers.map((traveler) => ({
        ...traveler,
        checkedStatus: formatAvailability(traveler, findUnavailableTravelers),
        checkAvailability: formatAvailability(traveler, travelerNameById)
      }))
      setObjForChkBox(reformatTravelers)

      //set initial travelers based on booking
      const initialTravelerNameById = selectedTimeslotBookings.filter((booking) => booking.booking_name === event.target.value).map((selectedBooking) => {
        return selectedBooking.traveler_id.split(",")
      }).flat().map((id) => parseInt(id))
      setStateForSubmit(initialTravelerNameById)
      
      //determine which booking to patch or delete
      const selectedId = activityBookings.filter((booking) => {return booking.booking_name === event.target.value})[0].id
      setBookingSelected(selectedId)

      setBookingName(event.target.value)

      if(event.target.value.length > 0){
        setEditOrCreateButton(false)
        setCancelButton(false)
      } else {
        setEditOrCreateButton(true)
      }

      //setEditOrCreateButton((toggle) => !toggle)
    }

    //callback function to determine which person is selected
    const handleAddTraveler = (e) => {
      proxyState(e, stateForSubmit, setStateForSubmit)

      const changeTravelerChkBox = [...objForChkBox]
      changeTravelerChkBox[parseInt(e)-1] = {...changeTravelerChkBox[parseInt(e)-1], checkedStatus: !changeTravelerChkBox[parseInt(e)-1].checkedStatus}
      setObjForChkBox(changeTravelerChkBox)

      //Hides bookings when creating a NEW booking
      if(editOrCreateButton === true){
        setCancelButton(false)
      }

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
        } else {
          setSelectedTimeslotBookings(selectedTimeslotBookings.concat([booking]))
        }

        const revisedNameArray = bookingNameArray.concat(booking.booking_name)
        setBookingNameArray(revisedNameArray)

        const revisedAvailability = changeCheckBoxStatus(stateForSubmit, objForChkBox)
        setObjForChkBox(revisedAvailability)

        if(renderComponent === false){
          setEditOrCreateButton(true)
        }

      })) : (
        //console.log(bookingSelected)
        fetch(`http://localhost:9292/bookings/${bookingSelected}/edit`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
             booking_name: bookingName,
             traveler_id: stateForSubmit.toString()
          })
        })
          .then((resp) => resp.json())
          .then((booking) => {
            const resetBookings = selectedTimeslotBookings.filter((eachBooking) => eachBooking.id !== bookingSelected).concat([booking])
            setSelectedTimeslotBookings(resetBookings)

            const findUnavailableTravelers = resetBookings.map((eachBooking) => {
              return eachBooking.traveler_id.split(",")
            }).flat().map((id) => parseInt(id))
            const reformatTravelers = travelers.map((traveler) => ({
              ...traveler,
              checkedStatus: formatAvailability(traveler, findUnavailableTravelers),
              checkAvailability: formatAvailability(traveler, findUnavailableTravelers)
            }))
            setObjForChkBox(reformatTravelers)

            const selectedBookingName = selectedTimeslotBookings.filter((eachBooking) => eachBooking.id === bookingSelected)[0].booking_name
            const revisedNameArray = bookingNameArray.filter((eachName) => eachName !== selectedBookingName).concat(booking.booking_name)
            setBookingNameArray(revisedNameArray)

          })
      )}
  }

  const handleCancelButton = () => {
    //makes button disappear
    setCancelButton((toggle) => !toggle)

    //resets checkboxes back
    const findUnavailableTravelers = selectedTimeslotBookings.map((booking) => {
      return booking.traveler_id.split(",")
    }).flat().map((id) => parseInt(id))
    const reformatTravelers = travelers.map((traveler) => ({
      ...traveler,
      checkedStatus: formatAvailability(traveler, findUnavailableTravelers),
      checkAvailability: formatAvailability(traveler, findUnavailableTravelers)
    }))
    setObjForChkBox(reformatTravelers)

    //reset button name to 'Create Activity'
    setEditOrCreateButton(true)

    //resets booking name
    setBookingName("")
  }


//---------------------------------------Handle Functions END-----------------------------------------------

    //components set to a variable for conditional rendering
    const renderCreateBooking = <CreateBooking
      handleDisplayNames={handleDisplayNames}
    />
  
    const renderEditBookingFormComponent = <EditBookingForm
      bookingNameArray={bookingNameArray} 
      allTravelers={travelers}
      handleBookedTravelers={handleBookedTravelers}
      cancelButtonStatus={cancelButton}
    />

    const renderBookingForm = <BookingForm
      unavailableTravelers={selectedTimeslotBookings}
      reformatTravelers={objForChkBox}
      renderComponent={renderComponent}
      editOrCreateButton={editOrCreateButton}
      handleSubmit={handleSubmit}
      bookingName={bookingName}
      setBookingName={(e) => setBookingName(e.target.value)}
      handleAddTraveler={handleAddTraveler}
      cancelButtonStatus={cancelButton}
      handleCancelButton={handleCancelButton}
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
        </div>
    )

}

export default TimeAvailability