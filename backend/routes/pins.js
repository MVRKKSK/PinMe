const express = require("express")
const router = express.Router();
const Pin = require("../models/Pin.js")

router.post("/" , (req,res) =>{
    const newPin = new Pin(req.body)
})