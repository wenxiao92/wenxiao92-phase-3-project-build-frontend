import React, {useEffect, useState} from "react";
import ChooseActivity from "./ChooseActivity";
import { formatTimeslot } from "../services/TimeslotFormat"

const App = () => {
  
  const [activities, setActivities] = useState([])
  const [chosenActivity, setChosenActivity] = useState("")
  const [timeslot, setTimeSlot] = useState([])
  const [activityBookings, setActivityBookings] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/activities")
      .then((r) => r.json())
      .then((activities) => setActivities(activities));
  }, []);


  //use to format future activity (make sure to grab from /services path)
  const formattedActivities = activities.map((activity) => ({
    // this won't persist on the server
    ...activity,
    timeslotArray: formatTimeslot(activity.activity_timeslot)
  }))
  //console.log(formattedActivities) //test to see if new timeslot attribute is added to activity

  const handleActivityDropdown = (event) => {
    setChosenActivity(event.target.value);
    const activityTimeslot = formattedActivities.find(element => element.activity_name === event.target.value).activity_timeslot.split(',')
    setTimeSlot(activityTimeslot)
    const activityId = activities.find(element => element.activity_name === event.target.value).id
    
    fetch(`http://localhost:9292/activities/${activityId}/bookings`)
      .then((r) => r.json())
      .then((bookings) => setActivityBookings(bookings));
  };  

  return (
    <div className="App">
      <h1>"Hello World"</h1>
      <ChooseActivity activities={activities} chosenActivity={chosenActivity} activityDropdown={handleActivityDropdown} propTimeslot={timeslot} activityBookings={activityBookings}/>
    </div>
  );
}

export default App;
