var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// INDEX ROUTE
router.get("/", isLoggedIn, function(req, res){
  res.render("dashboard")
});

// ============
// AUTH ROUTES
// ============

// show register form
router.get("/register", function(req, res){
  res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/stations")
    });
  });
});

// show login form
router.get("/login", function(req, res){
  res.render("login");
});

// handle login logic
router.post("/login",passport.authenticate("local",
{
  successRedirect: "/stations",
  failureRedirect: "/login"
}) ,function(req, res){
});

// LOUGOUT ROUTE
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/login");
});


function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
