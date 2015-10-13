var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: { type:String, required:true },
  lastName: { type:String, required:true },
  age: Number,
  email: { type:String, required:true },
  homeAddress: {
        addressLine: String,
        city: String,
        zip: String
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
