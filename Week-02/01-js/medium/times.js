/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/
let time = new Date();

function calculateTime(n) {
  const start = new Date().getTime();
  let sum = 0;
  for (let i = 0; i < sum; i++) {
    sum += i;
  }
  return sum;
  const end = new Date().getTime();
  const timeTaken = (end - start) / 1000; // Convert milliseconds to seconds
  return timeTaken;
}

console.log("1–100:", calculateTime(100), "seconds");
console.log("1–100000:", calculateTime(100000), "seconds");
