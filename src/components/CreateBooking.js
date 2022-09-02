import React, {useState} from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CreateBooking({traveler}) {
    const {id, name, availability} = traveler

    const [checked, setChecked] = useState(true)

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    return (
        <FormGroup>
            <FormControlLabel
                disabled={availability}
                label={name}
                control={
                    <Checkbox
                        checked={availability}
                        onChange={handleChange}
                    />
                }
            />
        </FormGroup>
    );
}

export default CreateBooking;