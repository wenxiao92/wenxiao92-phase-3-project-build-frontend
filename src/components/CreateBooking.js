import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CreateBooking = ({handleDisplayNames}) => {

    return (
        <Stack spacing={2} direction="row">
          <Button onClick={handleDisplayNames} variant="contained"> No Bookings (Click to start one) </Button>
        </Stack>
      );
}

export default CreateBooking