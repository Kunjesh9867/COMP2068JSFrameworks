var express = require("express");
var router = express.Router();

const Cart = require("../models/cart");

const Oneway = require("../models/oneway");

var mongoose = require("mongoose");


function IsLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get("/", IsLoggedIn, (req, res, next) => {
    Cart.find()
        .then((data) => {
            res.render("cartflight/index", { title: "Express", dataset: dat, user: req.username });
            console.log("No ERROR");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Cart Find Error");
        });
});

router.get("/add/:_id", (req, res, next) => {
    const { _id } = req.params; // Assuming _id is a string

    console.log(_id);
    // Assuming the _id is a MongoDB ObjectId (common in MongoDB)
    const objectId = new mongoose.Types.ObjectId(_id); // Make sure to require mongoose at the top

    // Fetch the document from the database using the ObjectId
    Oneway.findById(objectId)
        .then((cart) => {
            if (!cart) {
                // Handle if the document with the given _id is not found
                return res.status(404).send("Cart not found");
            }

            // Accessing properties and storing them in variables
            const time = cart.time;
            const nonstop = cart.nonstop;
            const price = cart.price;
            const city = cart.city;
            const date = cart.date;
            const flight = cart.flight;

            // Now, you can use these variables as needed
            console.log("time:", time);
            console.log("nonstop:", nonstop);
            console.log("price:", price);
            console.log("city:", city);
            console.log("date:", date);
            console.log("flight:", flight);

            // Use these variables to create a new Cart instance or perform any other actions
            Cart.create({
                time: time,
                nonstop: nonstop,
                price: price,
                city: city,
                date: date,
                flight: flight,
            })
                .then((newCart) => {
                    console.log("done");
                    res.redirect("/Cart");
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});

//? DELETE
router.get("/delete/:_id", (req, res, next) => {
    // call remove method and pass id as a json object
    Cart.deleteOne({ _id: req.params._id })
        .exec()
        .then(() => {
            res.redirect("/")
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});
module.exports = router;
