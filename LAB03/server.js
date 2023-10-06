const connect = require("connect"); // Using connect module
const app = connect();

function calculate(req, res, next) {
    // ["http://localhost:3000/lab2", "method=add&x=16&y=4"]
    const splitByQuestionary = req.url.split("?");

    // ["method=add","x=16, "y=4"]
    const queryParams = splitByQuestionary[1].split("&");
    let method, x, y;

    queryParams.forEach((param) => {
        const [key, value] = param.split("="); // Destructuring assignment
        if (key === "method") {
            method = value;
        } else if (key === "x") {
            x = parseFloat(value); // Converting the value into float
        } else if (key === "y") {
            y = parseFloat(value);
        }
    });

    switch (method) {
        case "add":
            res.end(`<h1>${x} + ${y} = ${x + y}</h1>`);
            break;
        case "subtract":
            res.end(`<h1>${x} - ${y} = ${x - y}</h1>`);
            break;
        case "multiply":
            res.end(`<h1>${x} * ${y} = ${x * y}</h1>`);
            break;
        case "divide":
            if (y !== 0) {
                res.end(`<h1>${x} / ${y} = ${x / y}</h1>`);
            } else {
                res.end("<h1>Division by zero is not allowed</h1>");
                return;
            }
            break;
        default:
            res.end("<h1>Invalid method</h1>");
            return;
    }
}

app.use("/lab2", calculate);
app.use("/", printMessage); // Printing the message when url is incorrect

function printMessage(req, res, next) {
    res.end(`<h1 style="text-align: center;">Check your URL</h1>`);
}

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
