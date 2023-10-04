const connect = require("connect");
const app = connect();

function calculate(req, res, next) {
    const splitByQuestionmark = req.url.split("?");
    const queryParams = splitByQuestionmark[1].split("&");
    let method, x, y;

    queryParams.forEach((param) => {
        const [key, value] = param.split("="); // Destructuring assignment
        if (key === "method") {
            method = value;
        } else if (key === "x") {
            x = parseFloat(value);
        } else if (key === "y") {
            y = parseFloat(value);
        }
    });

    if (isNaN(x) || isNaN(y)) {
        res.end("Invalid parameters");
        return;
    }

    let result;

    switch (method) {
        case "add":
            result = x + y;
            break;
        case "subtract":
            result = x - y;
            break;
        case "multiply":
            result = x * y;
            break;
        case "divide":
            if (y !== 0) {
                result = x / y;
            } else {
                res.end("Division by zero is not allowed");
                return;
            }
            break;
        default:
            res.end("Invalid method");
            return;
    }

    res.end(`${x} ${method} ${y} = ${result}`);
}

app.use("/lab2", calculate);

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
