import React, {useState} from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SelectNames({reformatTravelers, handleAddTraveler, renderComponent}) {

    const handleCheckedState = (event) => {
        handleAddTraveler(event.target.id)
    }

    const displayNames = reformatTravelers.map((traveler) => (
        <FormGroup>
            <FormControlLabel
                disabled={traveler.checkAvailability}
                label={traveler.name}
                control={
                    <Checkbox
                        id={traveler.id.toString()}
                        checked={traveler.checkedStatus}
                        onChange={handleCheckedState}
                    />
                }
            />
        </FormGroup>
    ))


    return (
        <div>
            {displayNames}
        </div>
    );
}

export default SelectNames;

// return (
//     <FormGroup>
//         <FormControlLabel
//             disabled={checkAvailability}
//             label={name}
//             control={
//                 <Checkbox
//                     id={id.toString()}
//                     checked={renderComponent ? checked : checkedStatus}
//                     onChange={handleCheckedState}
//                 />
//             }
//         />
//     </FormGroup>
// );