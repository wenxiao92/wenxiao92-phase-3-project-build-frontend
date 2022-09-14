import React, { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TimeAvailability from "./TimeAvailability";

const ChooseActivity = ({activities, chosenActivity, activityDropdown, propTimeslot, activityBookings, allowCheckBox}) => {
    //console.log(propTimeslot, activityBookings) //test if array prop is flowing through

    const activityNames = activities.map((activity) => 
      activity.activity_name
    )

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
            onChange={activityDropdown}
          >
            {activityNames.map((activity) => (
                <MenuItem key={activity.id} value={activity}>
                {activity}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        <TimeAvailability propTimeslot={propTimeslot} activityBookings={activityBookings} allowCheckBox={allowCheckBox}/>
    </div>
    )
}

export default ChooseActivity;