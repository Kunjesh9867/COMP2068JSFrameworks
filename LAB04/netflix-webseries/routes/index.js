var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/mystery", function (req, res, next) {
    res.render("mystery", { title: "Express" });
});
router.get("/romance", function (req, res, next) {
    res.render("romance", { title: "Express" });
});
router.get("/comedy", function (req, res, next) {
    res.render("comedy", { title: "Express" });
});
router.get("/action", function (req, res, next) {
    res.render("action", { title: "Express" });
});

module.exports = router;
