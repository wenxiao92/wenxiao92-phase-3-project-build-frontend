export function formatTimeslot(timeslots) {
    return timeslots
      .split(",")
  }

export function formatAvailability(traveler, array) {
    if(array.includes(traveler.id)) {
      return true;
    } else {
      return false;
    }
  }

  export function bookingsSummary(booking) {
    if(booking === null){
      return 
    } else {
      return booking
    }
  
  }  