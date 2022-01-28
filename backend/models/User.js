const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String , 
        unique: true ,
        min: 5 , 
        max: 20 , 
        require: true
    },
    email: {
        type: String,
        unique: true , 
        require: true
    } , 
    password: {
        type : String ,
        require: true ,
        min: 5
    }
} , {timestamps: true});

module.exports = mongoose.model("User" , User)