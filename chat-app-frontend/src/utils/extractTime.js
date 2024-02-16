export function extractTime(dateString) {
  const date = new Date(dateString);
  //for bd time zone
  date.setHours(date.getHours() + 12);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const amOrPm = date.getHours() < 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${amOrPm}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
