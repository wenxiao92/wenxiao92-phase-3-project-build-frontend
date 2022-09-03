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

export function proxyState(id, array, cb) {
    if(array.includes(id)) {
      cb(array.filter((el) => el !== id))
    } else {
      cb(array.concat(id));
    }
}