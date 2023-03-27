// the function calculates the week number of a given date based on the week numbering system that considers weeks starting from the first Thursday of the year.
// This function takes a date as a parameter
const getWeekNumber = (oDate) => {
  // Create a new Date object from the date
  const date = new Date(oDate);
  // Set the time of the date object to 00:00:00.000
  date.setHours(0, 0, 0, 0);
  // Calculate the date of the thursday in the current week
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // Create a new Date object for the beginning of the current year
  const yearStart = new Date(date.getFullYear(), 0, 1);
  // Calculate the week number
  // 1. Calculate the number of days between the Thursday in the current week and the beginning of the year
  // 2. Add 1 to account for the Thursday
  // 3. Divide by 7 to get the number of weeks
  // 4. Round up to the nearest whole number to get the week number
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  // Return the week number as a number
  return Number(weekNo);
};

export default getWeekNumber;
