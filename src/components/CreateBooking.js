import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CreateBooking = ({booking}) => {

    console.log(booking)

    return (
        <Stack spacing={2} direction="row">
          <Button variant="contained"> No Bookings (Click to create) </Button>
        </Stack>
      );
}

export default CreateBooking