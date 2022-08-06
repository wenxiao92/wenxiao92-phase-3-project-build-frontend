//import React, {useEffect, useState} from "react";
import {Button} from '@mui/material';
import Header from "./Header";

const App = () => {
  
  // const [activities, setActivities] = useState([])

  // useEffect(() => {
  //   fetch("http://localhost:9292/activities")
  //     .then((r) => r.json())
  //     .then((activities) => setActivities(activities));
  // }, []);
  
  return (
    <div className="App">
      <h1>"Hello World"</h1>
      <Header />
    </div>
  );
}

export default App;
