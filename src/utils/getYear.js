const getYear = (oDate) => {
  // Create a new date object from the start date string
  const date = new Date(oDate);
  // Get the year from the date object
  const year = date.getFullYear();
  // Return the year as a number
  return year;
};

export default getYear;
