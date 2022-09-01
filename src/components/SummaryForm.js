import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const SummaryForm = ({bookingName, handleBookedTravelers}) => {

    return (
        <Stack spacing={2} direction="row">
          <Button onClick={handleBookedTravelers} value={bookingName} variant="contained">{bookingName}</Button>
        </Stack>
      );
}

export default SummaryForm