import React, { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TimeAvailability = ({activityDetail, propTimeslot}) => {
    const [chosenTimeslot, setChosenTimeslot] = useState("")

    const handleChange = (event) => {
        setChosenTimeslot(event.target.value);
    };

    return(
        <div>
        <br></br>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="timeslot-select-label">Timeslots</InputLabel>
          <Select
            labelId="timeslot-select-label"
            id="timeslot-select"
            value={chosenTimeslot}
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
        </div>
    )

}

export default TimeAvailability