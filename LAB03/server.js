const connect = require("connect"); // Using connect module
const url = require("url"); // Using url module
const app = connect();

function calculate(method, x, y) {
    // Checking for method name
    switch (method) {
        case "add":
            return `<h1>${x} + ${y} = ${x + y}</h1>`; // String Literals

        case "subtract":
            return `<h1>${x} - ${y} = ${x - y}</h1>`;

        case "multiply":
            return `<h1>${x} * ${y} = ${x * y}</h1>`;

        case "divide":
            if (y !== 0) {
                return `<h1>${x} / ${y} = ${x / y}</h1>`;
            } else {
                return "<h1>Division by zero is not allowed</h1>";
            }
        default:
            return "<h1>Invalid method</h1>";
    }
}

// callback function
app.use("/lab2", (req, res, next) => {
    const parsedUrl = url.parse(req.url, true);
    const { method, x, y } = parsedUrl.query; // Destructing assignment
    const result = calculate(method, parseInt(x), parseInt(y)); // Calling calculate function
    res.end(result); // Printing the result
});
app.use("/", printMessage); // Printing the message when url is incorrect

// Printing Message
function printMessage(req, res, next) {
    res.end(`<h1 style="text-align: center;">Check your URL</h1>`);
}

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
