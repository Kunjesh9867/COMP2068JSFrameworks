var express = require("express");
var router = express.Router();

const Oneway = require("../models/oneway");



function IsLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

//? DEFAULT
router.get("/", IsLoggedIn, (req, res, next) => {
    Oneway.find()
        .then((data) => {
            res.render("oneway/index", { title: "Oneway List", dataset: data, user: req.user });
            console.log("Loged IN Data");
        })
        
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});


//? ADD
router.get("/add", (req, res, next) => {
    res.render("oneway/add", { title: "Add a new Course", user: req.user });
});

router.post("/add", (req, res, next) => {
    Oneway.create({
        time: req.body.time,
        nonstop: req.body.nonstop,
        price: req.body.price,
        city: req.body.city,
        date: req.body.date,
        flight: req.body.flight,
    })
        .then((newOneway) => {
            res.redirect("/oneway");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});


//? DELETE


module.exports = router;
