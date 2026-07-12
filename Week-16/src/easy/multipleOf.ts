// Write a function that checks if a number is a multiple of another number. 
// The function should return true if the first number is divisible by the second number, otherwise false.
// Ensure the function has proper type annotations.
// Example Input: num = 15, divisor = 5
// Example Output: true


const multiple = (num: number, div: number): boolean | undefined => {
  return num % div === 0 ? true : false;
};

console.log(multiple(15, 5));
console.log(multiple(20, 4));
console.log(multiple(15, 4));
console.log(multiple(0, 7));