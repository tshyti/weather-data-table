export function getDateFromUnixTimestamp(unixTimestamp) {
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date = new Date(unixTimestamp * 1000);

  return date.toLocaleDateString("us");
}
