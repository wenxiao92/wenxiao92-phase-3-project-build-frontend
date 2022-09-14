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

export function formatCheckBox(traveler, array) {
    if(array.includes(traveler.id)) {
      return true;
    } else {
      return false;
    }
  }

export function proxyState(id, array, cb) {
    if(array.includes(parseInt(id))) {
      cb(array.filter((el) => parseInt(el) !== parseInt(id)))
    } else {
      cb(array.concat(parseInt(id)));
    }
}