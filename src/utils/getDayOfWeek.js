// This function takes a date object as input and returns the corresponding day of the week as a string
const getDayOfWeek = (date) => {
  // Create an array with the days of the week in the correct order
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Use the getDay method of the Date object to get the day of the week (0-6)
  const dayIndex = date.getDay();
  // Use the day index to look up the corresponding day of the week in the daysOfWeek array
  const dayOfWeek = daysOfWeek[dayIndex];
  // Return the day of the week as a string
  return dayOfWeek;
};

export default getDayOfWeek;
