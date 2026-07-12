// Problem Statement:
// Write a generic function sum that accepts an array of numbers and returns the sum of all the numbers.

const sumArrays = <T extends number[]>(arr: T): number => {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
};

console.log(sumArrays([1, 2, 3, 4]));