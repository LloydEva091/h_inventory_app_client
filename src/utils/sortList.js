import React from "react";

// This is a function that accepts an array of objects and a property name, and sorts the array of objects by that property.
const sortList = (listOfArrays, propName) => {
  // This creates a new array with the same contents as the input array.
  const sortedArr = [...listOfArrays];
  // This sorts the new array using the specified property name.
  sortedArr.sort((a, b) => {
    if (a[propName] < b[propName]) {
      return -1;
    }
    if (a[propName] > b[propName]) {
      return 1;
    }
    return 0;
  });
  return sortedArr;
};

export default sortList;
