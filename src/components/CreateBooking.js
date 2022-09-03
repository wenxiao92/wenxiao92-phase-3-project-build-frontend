import React, {useState} from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CreateBooking({traveler, handleAddTraveler}) {

    const {id, name, availability} = traveler
    const [checked, setChecked] = useState(false);

    const handleCheckedState = (event) => {
        setChecked((toggle) => !toggle)
        handleAddTraveler(event.target.id)
    }



    return (
        <FormGroup>
            <FormControlLabel
                disabled={availability}
                label={name}
                control={
                    <Checkbox
                        id={id}
                        checked={checked}
                        onChange={handleCheckedState}
                    />
                }
            />
        </FormGroup>
    );
}

export default CreateBooking;