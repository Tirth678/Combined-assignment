// Problem Statement
// Write a function that describes a selected seat position on a flight.

// Use an enum to represent the possible seat positions: Window, Middle, and Aisle.
// The function should take the seat position as input and return a corresponding message.
// If the input is invalid, the function should throw an error.
// Ensure proper type annotations and error handling.

// Example Input:
// SeatPosition.Window

// Example Output:
// "You have selected a window seat."

enum Position {
  Window = "You have selected a windows seat",
  Middle = "You have selected a middle seat",
  Aisle = "You have selected a aisle seat",
}
const seatPosition = (s: Position) => {
  if (s.includes("window")) {
    return Position.Window;
  } else if (s.includes("middle")) {
    return Position.Middle;
  } else {
    return Position.Aisle;
  }
};

console.log(seatPosition(Position.Window));
console.log(seatPosition(Position.Middle));