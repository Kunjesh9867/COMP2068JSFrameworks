var prompt = require("prompt");
prompt.start();

let userInput;
prompt.get(["userInput"], function (err, result) {
    if (err) {
        console.error(`Error Message is: ${err}`);
        return;
    }
    console.log("(1) Enter R for Rock");
    console.log("(2) Enter P for Paper");
    console.log("(3) Enter S for Scissor");
    console.log("Enter your choice here: " + result.userInput);
    userInput = result.userInput;

    let computerInput = Math.random();
    if (computerInput >= 0.0 && computerInput <= 0.34) {
        computerInput = "P";
    } else if (computerInput >= 0.35 && computerInput <= 0.67) {
        computerInput = "S";
    } else {
        computerInput = "R";
    }
    console.log(`UserInput: ${userInput}`); //${typeof userInput} = string
    console.log(`ComputerInput: ${computerInput}`); // ${typeof userInput} = string

    let value = ["R", "P", "S"];
    if (userInput === computerInput) {
        console.log("It's a Tie");
    } else if (userInput === "R") {
        if (computerInput === "P") {
            console.log("Computer Won");
        } else {
            console.log("User Won");
        }
    } else if (userInput === "P") {
        if (computerInput === "S") {
            console.log("Computer Won");
        } else {
            console.log("User Won");
        }
    } else if (userInput === "S") {
        if (computerInput === "R") {    
            console.log("Computer Won");
        } else {
            console.log("User Won");
        }
    }
});
