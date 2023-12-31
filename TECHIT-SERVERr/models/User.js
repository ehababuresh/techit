const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
name:{
    type:String,
    required:true,
    minlength:2
} ,
email: {
    type: String,
    required: true,
    minlength: 6,
    unique: true
},
password: {
    type: String,
    required: true,
    minlength: 8
},
isAdmin: {
    type: Boolean,
    required: true,
    minlength: 2
},
});

const User = mongoose.model("users",userSchema)
module.exports = User;