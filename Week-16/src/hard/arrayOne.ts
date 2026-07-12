// Problem 1: Find the Minimum Value in an Array
// Problem Statement
// Write a function that takes an array of positive integers as input and returns the minimum value in the array.

// Input and Output
// Example Input 1: [10, 2, 8, 6]
// Example Output 1: 2
// Example Input 2: [7]
// Example Output 2: 7
// Example Input 3: []
// Example Output 3: Throws an error: "Array cannot be empty"


const arrayOne = (arr: number[]) => {
  if (arr.length === 0) {
    throw new Error("Array cannot be empty");
  }
  let min = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i];
    }
  }
  return min;
};

console.log(arrayOne([1, 2, 3, 4, 5, 8]));
console.log(arrayOne([1, 2, 3, 4, 5, 8]));
console.log(arrayOne([5, 4]));
console.log(arrayOne([-1, 10, -5, 8]));
console.log(arrayOne([]));
console.log(arrayOne([7]));