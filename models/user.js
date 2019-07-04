var mongoose = require("mongoose");
var passportLocalMongoose  = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  stations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station'
  }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

// from tutorial
// var User = mongoose.model("User", UserSchema);
// module.exports = User;
