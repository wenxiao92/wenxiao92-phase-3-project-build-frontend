import React, { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TimeAvailability from "./TimeAvailability";

const ChooseActivity = ({activities, activityDetail}) => {
    const [chosenActivity, setChosenActivity] = useState("")
    const [timeslot, setTimeSlot] = useState([])

    const handleChange = (event) => {
        setChosenActivity(event.target.value);
        const activityTimeslot = activityDetail.find(element => element.activity_name === event.target.value).activity_timeslot.split(',')
        setTimeSlot(activityTimeslot)
    };

    return(
    <div>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Activity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chosenActivity}
            label="Activity"
            onChange={handleChange}
          >
            {activities.map((activity) => (
                <MenuItem key={activity.id} value={activity}>
                {activity}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        <TimeAvailability activityDetail={activityDetail} propTimeslot={timeslot}/>
    </div>
    )
}

export default ChooseActivity;