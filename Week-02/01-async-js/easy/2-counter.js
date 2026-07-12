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

