// Problem Statement:
// Write a function createPair that takes two arguments of any type and returns a tuple with those values.

let arr = 0;
const createPair = <T>(val1: T, val2: T) => {
  return [val1, val2];
};

console.log(createPair<number>(2, 2));
console.log(createPair<string>("3e3e3", "d3d3"));
console.log(createPair<boolean>(true, true));