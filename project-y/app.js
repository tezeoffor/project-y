var express                = require("express"),
    app                    = express(),
    bodyParser             = require("body-parser"),
    methodOverride         = require("method-override"),
    mongoose               = require("mongoose").set("debug", true),
    passport               = require("passport"),
    LocalStrategy          = require("passport-local"),
    passportLocalMongoose  = require("passport-local-mongoose");
    User                   = require("./models/user");
    // Station                = require("./models/station");

// requiring routes
var stationRoutes          = require("./routes/station"),
    authRoutes             = require("./routes/index");

mongoose.connect("mongodb://localhost:/station", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "I will win",
  resave: false,
  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(stationRoutes);
app.use(authRoutes);

app.listen(3000, function () {
  console.log('Station app listening on port 3000!')
});
