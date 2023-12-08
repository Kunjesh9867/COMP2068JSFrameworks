var express = require("express");
var router = express.Router();
const passport = require("passport"); // Add this line

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log(req.user);
    res.render("index", { title: "Express", user: req.username });
});
router.get("/features", function (req, res, next) {
    res.render("features", { title: "Express" });
});
router.get("/about", function (req, res, next) {
    res.render("about", { title: "Express" });
});
router.get("/payment", function (req, res, next) {
    res.render("payment", { title: "Express" });
});
router.get("/thank", function (req, res, next) {
    res.render("thank", { title: "Express" });
});

router.get("/signup", function (req, res, next) {
    res.render("signup", { title: "Sign Up Page" });
});

router.get("/signup", function (req, res, next) {
    res.render("signup", { title: "Sign Up Page" });
});

// router.get("/cart/add/:_id", (req, res, next) => {
//     Cart.create({
//         time: req.time,
//         nonstop: req.body.nonstop,
//         price: req.body.price,
//         city: req.body.city,
//         flight: req.body.flight,
//     })
//         .then((newCart) => {
//           console.log("done");
//             res.redirect("/Cart");
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).send("Internal Server Error");
//         });
// });



const User = require("../models/user");
//? Login
// GET handler for /login
router.get("/login", (req, res, next) => {
    // res.render('login', { title: 'Login' });
    // Obtain messages if any
    let messages = req.session.messages || [];
    // Clear messages
    req.session.messages = [];
    // Pass messages to view
    res.render("login", { title: "Login", messages: messages, user: req.username });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/oneway',
  failureRedirect: '/login',
  failureMessage: 'Invalid credentials'
}));

//? Register
router.get("/register", (req, res, next) => {
    res.render("register", { title: "Create a new account", user: req.username });
});

router.post("/register", (req, res, next) => {  
    
    User.register(
        new User({
            username: req.body.username,
        }),
        req.body.password,
        (err, newUser) => {
            if (err) {
                console.log(err);
                // take user back and reload register page
                return res.redirect("/register");
            } else {
                // log user in
                req.login(newUser, (err) => {
                    console.log(req.body.username);
                    console.log(req.body.password);
                    res.redirect("/");
                });
            }
        }
    );
});



//? Logout
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        res.redirect("/login");
    });
});
module.exports = router;
