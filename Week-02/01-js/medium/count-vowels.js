/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/
function countVowels(str) {
  let totalVowels = 0;
  let vowels = "aeiouAEIOU";
  for (let i = 0; i <= str.length; i++) {
    if (vowels.includes(str[i])) {
      totalVowels++;
    }
  }
  return totalVowels;
}
let something = "Hi there how are you";
console.log(countVowels(something));

module.exports = countVowels;
