// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

const counter = (function count(n){
    return function(){
        console.log(n++);
        setTimeout(counter, 1000);
    }
})(0); // Start counting from 0

// Start the counter
counter();

/*
this is application of IIFE (immediately invoked function express)
functions that are executed the moment it is declared are iife functions
the counter variable is assigned the value of the returned function of the iife
when the counter() is called, it will log the value of n and increment it by 1
then call the setTimeout which will call the counter function again after 1000ms
the process repeats itself infinitely
*/