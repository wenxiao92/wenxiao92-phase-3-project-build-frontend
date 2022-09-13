import React, {useState} from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SelectNames({traveler, handleAddTraveler, renderComponent}) {

    const {id, name, checkedStatus, checkAvailability} = traveler

    //console.log(id, name, checkedStatus)
    const [checked, setChecked] = useState(false);


    const handleCheckedState = (event) => {
        setChecked((toggle) => !toggle)
        handleAddTraveler(event.target.id)
    }



    return (
        <FormGroup>
            <FormControlLabel
                disabled={checkAvailability}
                label={name}
                control={
                    <Checkbox
                        id={id.toString()}
                        checked={renderComponent ? checked : checkedStatus}
                        onChange={handleCheckedState}
                    />
                }
            />
        </FormGroup>
    );
}

export default SelectNames;