import moment from 'moment';

export function taskWasCompletedInTime(
  startAt: string | Date,
  finishAt: string | Date
) {
  const today = new Date();
  if (
    moment(today).isSameOrAfter(startAt) ||
    moment(today).isSameOrBefore(finishAt)
  ) {
    return true;
  } else {
    return false;
  }
}
