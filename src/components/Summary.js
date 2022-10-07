import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Summary = ({bookingName, handleBookedTravelers, cancelButtonStatus, handleDelete}) => {

    return (
        <Stack spacing={2} direction="row">
          {cancelButtonStatus ?
          (<div>
          <Button onClick={handleBookedTravelers} value={bookingName} variant="contained">{bookingName}</Button>
          <Button onClick={handleDelete} value={bookingName}>Delete</Button></div>) :
          <Button disabled onClick={handleBookedTravelers} value={bookingName} variant="contained">{bookingName}</Button>}
        </Stack>
      );
}

export default Summary