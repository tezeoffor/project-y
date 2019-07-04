var express     = require("express");
var router      = express.Router();
var Station     = require("../models/station");
var User        = require("../models/user");


// TODO: for showing the number of tank you have to check the id and print the number of tanK
// STATION ROUTE
router.get("/stations", isLoggedIn, function(req, res){
  Station.find({}, function(err, allStations){
    if(err){
      console.log(err);
    }else{
      res.render("stations" ,{viewStation:allStations});
    }
  })
});

// SALES ROUTE
router.get("/sales", isLoggedIn, function(req, res){
  Station.find({}, function(err, allStations){
    if(err){
      console.log(err);
    }else{
      res.render("sales" ,{viewStation:allStations});
    }
  })
});

router.get("/viewStation", isLoggedIn, function(req, res){
  Station.find({}, function(err, allStations){
    if(err){
      console.log(err);
    }else{
      res.render("viewStation" ,{viewStation:allStations});
    }
  })
});

// CREATE ROUTE
router.post("/viewStation", isLoggedIn, function(req, res){
  User.findById(req.user_id, function(err, foundUser){
    if (err) {
      console.log(err);
    }
    else {
      console.log(foundUser);
      //get data from form and add to viewStation array
      var managerName = req.body.managerName;
      var address = req.body.address;
      var tanks = req.body.tanks;
      var price = req.body.price;


      var newStation =
      {
         managerName: managerName,
         address: address,
         numberOfTanks: tanks,
         pricePerLitre: price,
      };
      // Create a new station and save to DB
      Station.create(newStation, function(err, newlyCreated){
        if (err) {
          res.render("/newStation");
        } else {
          console.log(newlyCreated);
          foundUser.stations.push(newlyCreated);
          foundUser.save();
          //redirect back to viewStation page
          res.redirect("/viewStation");
        }
      });
    }
  });
});

router.get("/viewStation/new", isLoggedIn, function(req, res) {
  res.render("newStation.ejs");
});

//SHOW ROUTE
router.get("/viewStation/:id", isLoggedIn, function(req, res){
  console.log(req.numberOfTanks);
  Station.findById(req.params.id, function(err, foundStation){
    if (err) {
      console.log(err);
    }else {
      res.render("show", {viewStation : foundStation});
    }
  })
})

// EDIT ROUTE
router.get("/viewStation/:id/edit", isLoggedIn, function(req, res){
  Station.findById(req.params.id, function(err, foundStation){
    console.log(req.params.id);
    if (err) {
      console.log(err);
    }else {
      res.render("editStation", {station:foundStation});
    }
  });
})

// UPDATE ROUTE
router.put("/viewStation/:id", isLoggedIn, function(req, res){
  //get data from form and add to viewStation array
  var managerName = req.body.managerName;
  var address = req.body.address;
  var tanks = req.body.tanks;
  var price = req.body.price;
  var updatedStation =
  {
     managerName: managerName,
     address: address,
     numberOfTanks: tanks,
     pricePerLitre: price
  };
  Station.findByIdAndUpdate(req.params.id, updatedStation, function(err, updatedStation){
    if(err){
      res.redirect("/viewStation");
    } else {
      res.redirect("/viewStation");
    }
  });
});


// DELETE ROUTE
router.delete("/viewStation/:id", isLoggedIn, function(req, res){
  Station.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/viewStation")
    } else {
      res.redirect("/viewStation")
    }
  })
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
