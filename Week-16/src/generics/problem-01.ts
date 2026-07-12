// Problem Statement:
// Write a function identity that takes an argument of any type and returns the same type.

function doSomething<T>(num: T): T {
  return num;
}

let output1 = doSomething<number>(12);
let output2 = doSomething<string>("Hi");
console.log(output1);
console.log(output2);