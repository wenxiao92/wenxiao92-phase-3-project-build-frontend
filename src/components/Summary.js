import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Summary = ({bookingName, handleBookedTravelers, cancelButtonStatus}) => {

    return (
        <Stack spacing={2} direction="row">
          {cancelButtonStatus ?
          <Button onClick={handleBookedTravelers} value={bookingName} variant="contained">{bookingName}</Button> :
          <Button disabled onClick={handleBookedTravelers} value={bookingName} variant="contained">{bookingName}</Button>}
        </Stack>
      );
}

export default Summary