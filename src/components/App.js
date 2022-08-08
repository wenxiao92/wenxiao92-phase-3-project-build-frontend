import React, {useEffect, useState} from "react";
import {Button} from '@mui/material';
import Header from "./Header";
import { formatTimeslot } from "../services/TimeslotFormat"

const App = () => {
  
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/activities")
      .then((r) => r.json())
      .then((activities) => setActivities(activities));
  }, []);

  const formattedActivities = activities.map((activity) => ({
    // this won't persist on the server
    ...activity,
    timeslotArray: formatTimeslot(activity.activity_timeslot)
  }))
  //console.log(formattedActivities) //test to see if new timeslot attribute is added to activity

  return (
    <div className="App">
      <h1>"Hello World"</h1>
      <Header activities={formattedActivities}/>
    </div>
  );
}

export default App;
