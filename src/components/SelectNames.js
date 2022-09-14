import React, {useState} from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SelectNames({traveler, handleAddTraveler, renderComponent}) {

    const {id, name, checkedStatus, checkAvailability} = traveler

    const [checked, setChecked] = useState(false);
    const [preChecked, setPreChecked] = useState(checkedStatus)


    const handleCheckedState = (event) => {
        setChecked((toggle) => !toggle)
        setPreChecked((toggle) => !toggle)
        handleAddTraveler(event.target.id)
    }

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                    disabled={checkAvailability}
                    label={name}
                        control={
                            <Checkbox
                                id={id.toString()}
                                checked={renderComponent ? checked : checkedStatus} //resets if true
                                onChange={handleCheckedState}
                            />
                        }
                />
            </FormGroup>
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