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

export function changeCheckBoxStatus(travelerArray, allTraveler) {
  let clone = [...allTraveler]

  for(let i=0 ; i < travelerArray.length; i++){
    clone[travelerArray[i]-1] = {...clone[travelerArray[i]-1], checkAvailability: !clone[travelerArray[i]-1].checkAvailability}
  }
  return clone
  }

export function proxyState(id, array, cb) {
    if(array.includes(parseInt(id))) {
      cb(array.filter((el) => parseInt(el) !== parseInt(id)))
    } else {
      cb(array.concat(parseInt(id)));
    }
}