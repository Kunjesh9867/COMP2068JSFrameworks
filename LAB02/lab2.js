var prompt = require("prompt"); // Adding prompt using npm (npm i prompt)

// Message for user
console.log("(1) Enter R for Rock");
console.log("(2) Enter P for Paper");
console.log("(3) Enter S for Scissor");

prompt.start();
prompt.get(["userInput"], function (err, result) {
    // If there is an error
    if (err) {
        console.error(`Error Message is: ${err}`);
        return;
    }

    let computerInput = Math.random(); // Taking a random number between 0.0 and 1.0

    // Converting computerInput into R,P,S
    if (computerInput >= 0.0 && computerInput <= 0.34) {
        computerInput = "P";
    } else if (computerInput >= 0.35 && computerInput <= 0.67) {
        computerInput = "S";
    } else {
        computerInput = "R";
    }

    // Displaying the value of user and computer in console using String Literals
    console.log(`UserInput: ${result.userInput}`); //${typeof userInput} = string
    console.log(`ComputerInput: ${computerInput}`); // ${typeof userInput} = string

    // Checking WHO WINS using nested if loops
    if (result.userInput === computerInput) {
        console.log("It's a Tie");
    } else if (result.userInput === "R") {
        if (computerInput === "P") {
            console.log("Computer Won");
        } else {
            console.log("User Wins");
        }
    } else if (result.userInput === "P") {
        if (computerInput === "S") {
            console.log("Computer Wins");
        } else {
            console.log("User Won");
        }
    } else if (result.userInput === "S") {
        if (computerInput === "R") {
            console.log("Computer Won");
        } else {
            console.log("User Won");
        }
    }
});
