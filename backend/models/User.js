const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: string , 
        unique: true ,
        min: 5 , 
        max: 20 , 
        require: true
    },
    email: {
        type: string,
        unique: true , 
        require: true
    } , 
    passwords: {
        type : string ,
        require: true ,
        min: 5
    }
} , {timestamps: true});

module.exports = mongoose.model("User" , User)