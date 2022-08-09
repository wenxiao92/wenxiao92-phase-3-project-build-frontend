import React, { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ChooseActivity = ({activities}) => {
    const [chosenActivity, setChosenActivity] = useState("")

    const handleChange = (event) => {
        setChosenActivity(event.target.value);
    };

    return(
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
    )
}

export default ChooseActivity;