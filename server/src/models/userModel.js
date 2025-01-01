const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plainPassword: { type: String, required: false},
},
{
  timestamps:true,
  versionKey:false
});

const User = model("User", userSchema);
module.exports = User;


// profilePic: {
  //   type: String,
  //   required: false,
  //   default: "https://loremflickr.com/500/500?lock=8792450353592873",
  // },
  
  //savedBusinesses: [{ type: Schema.Types.ObjectId, ref: "Business" }],